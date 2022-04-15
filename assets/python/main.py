import sys
import RPi.GPIO as GPIO
import time

from ultrasonic import distance
import servo

GPIO_SERVO = int(sys.argv[1])
GPIO.setup(GPIO_SERVO, GPIO.OUT)

servo = GPIO.PWM(GPIO_SERVO, 50)

if __name__ == '__main__':
    try:
        while True:
            servo.start(servo)

            dist = distance()
            print("%.1f" % dist)

            if dist <= 4:
                servo.stop(servo)
                break

            time.sleep(0.03)

        GPIO.cleanup()
    except KeyboardInterrupt:
        print("Measurement stopped by User")
        GPIO.cleanup()
