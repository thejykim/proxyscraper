import os
import sys

if __name__ == '__main__':
    f = open(sys.argv[1])
    for line in f:
        print(line)
    f.close()

    if os.path.exists(sys.argv[1]):
        os.remove(sys.argv[1])