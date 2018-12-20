#!/usr/bin/env python3

import sys


if len(sys.argv) != 2:
    print("Need one arguments, the component name")
    exit()

with open("test_placeholder.txt", "r") as f:
    content = f.read()

component_name = sys.argv[1]

test = content.replace("PLACEHOLDER", component_name)
with open("src/{}/{}.test.tsx".format(component_name, component_name), "w") as f:
    f.write(test)
