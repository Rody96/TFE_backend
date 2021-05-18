import serial
import time
import requests
 
# Define the serial port and baud rate.
ser = serial.Serial('COM4', 9600)


def led_on_off():
    r = requests.get("https://rodrigue-projects.site/users/getFanState?id=1")
    fanState = r.json()[0]['fanState']
    user_input = fanState
    if user_input == 1:
        print("Fans is on...")
        time.sleep(0.1) 
        ser.write(b'1') 
        led_on_off()
    elif user_input == 0:
        print("Fan is off...")
        time.sleep(0.1)
        ser.write(b'0')
        led_on_off()
 
time.sleep(2) # wait for the serial connection to initialize
 
led_on_off()