import RPi.GPIO as GPIO
import time
 
GPIO.setmode(GPIO.BOARD)
 
GPIO_TRIGGER = 16
GPIO_ECHO = 18
 
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)
 
def distance():
    new_reading = False
    counter = 0
    
    GPIO.output(GPIO_TRIGGER, True)
    time.sleep(0.00001)
    GPIO.output(GPIO_TRIGGER, False)
 
    StartTime = time.time()
    StopTime = time.time()
 
    while GPIO.input(GPIO_ECHO) == 0:
        counter += 1
        if counter == 5000:
            new_reading = True
            break
    StartTime = time.time()

    if new_reading:
        return False
 
    while GPIO.input(GPIO_ECHO) == 1:
        pass
    StopTime = time.time()
 
    TimeElapsed = StopTime - StartTime
    distance = (TimeElapsed * 34300) / 2
 
    return distance