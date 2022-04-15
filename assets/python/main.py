import RPi.GPIO as GPIO
import time

from ultrasonic import distance
import servo

if __name__ == '__main__':
    try:
        while True:
            servo.init(11)
            servo.start()

            dist = distance()
            print("%.1f" % dist)

            if dist <= 4:
                servo.stop()
                break

            time.sleep(0.03)

        GPIO.cleanup()
    except KeyboardInterrupt:
        print("Measurement stopped by User")
        GPIO.cleanup()
