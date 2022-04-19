# import sys

# print('Number of arguments:', len(sys.argv), 'arguments.')
# print('Argument list:', sys.argv[1])
import time

try:
    while True:
        print("Hello World")
        time.sleep(0.05)
except KeyboardInterrupt:
    print("Exit by user")
