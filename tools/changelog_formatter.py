#!/usr/bin/python3
#
# Usage: run this tool and input comma (,) formatted CSV export from Jira
# Will output text that is copy-pasteable to changelog.txt.
# Required fields in CSV from Jira: Issue key, Components, Summary.
#

import csv
import sys

reader = csv.reader(sys.stdin, delimiter=',', quotechar='"')
first = True
# Issue key,Issue id,Component/s,Component/s,Component/s,Summary
cols = []
for row in reader:
    if first:
        cols = row
        first = False
    else:
        components = []
        key = ""
        title = ""
        n = 0
        for col in cols:
            try:
                val = row[n]
            except:
                print(row)
                print(cols)
                raise
            if col == "Issue key":
                key = val
            elif col == "Issue id":
                pass
            elif col == "Component/s":
                val = val.strip()
                if val:
                    if val == "Sensor UI":
                        val = "UI"
                    elif val == "messaging":
                        val = "API"
                    components.append(val)
            elif col == "Summary":
                title = val
            else:
                #raise ValueError(f"Unknown key {col}")
                continue
            n += 1
        if not components:

            print(f"  [{key}] - {title}")
        else:
            print(f"  [{key}] - {', '.join(components)}: {title}")
