#!/bin/bash -e

ca_cn="logstash-test-ca"
org="Logstash Test"
hosts="elk.demo.sensorfleet.com:server logstash-client:client"

# some java versions/http output plugin do not support EC, use RSA for logstash
primitive=rsa
curve=secp384r1
rsakeysize=2048
hash=SHA384
openssl=/usr/bin/openssl

rm -f *.crt *.key *.csr

test -n "${openssl}" || {
    echo "set openssl binary path in environment, e.g. openssl=openssl ./keys.sh"
    echo "openssl version 1.1 or later is required for -addext parameter"
    exit 1
}

#    -addext basicConstraints=critical,CA:TRUE,pathlen:1 \
#"${openssl}" ecparam -genkey -name $curve -out ca.key
"${openssl}" genrsa -out ca.key $rsakeysize

"${openssl}" req -x509 \
    -new -$hash -nodes -key ca.key -days 3650 -subj "/CN=$ca_cn/O=$org/C=FI" \
    -out ca.crt

for hostraw in $hosts; do
    host=$(echo $hostraw|cut -f 1 -d :)
    host_type=$(echo $hostraw|cut -f 2 -d :)
    echo "$host type $host_type"
    #"${openssl}" ecparam -genkey -name $curve -out $host.key
    "${openssl}" genrsa -out $host.key $rsakeysize
    echo "req"
    "${openssl}" req -new -$hash -key $host.key -nodes -out $host.csr \
        -addext "subjectAltName = DNS:$host" \
        -addext "certificatePolicies = 1.2.3.4" \
        -addext "nsCertType = $host_type" \
        -addext "extendedKeyUsage = ${host_type}Auth" \
        -subj "/CN=$host/O=$org/C=FI"

    # logstash HTTP input plugin wants PKCS 1.5 ":D"
    # Convert the key to compatible format
    openssl pkcs8 -v2 des3 -in $host.key -topk8 -out ${host}_pk8.key -nocrypt
    echo "x509"
    "${openssl}" x509 -req -$hash -days 3650 -in $host.csr \
        -CA ca.crt -CAkey ca.key -CAcreateserial \
        -extfile <(printf "[ext]\nsubjectAltName=DNS:$host\nnsCertType = $host_type\nextendedKeyUsage=${host_type}Auth") \
        -extensions ext \
        -out $host.crt
    echo "print"
    "${openssl}" x509 -in $host.crt -noout -text
done

"${openssl}" x509 -in ca.crt -noout -text
