import serial
import time
import schedule
import requests

def main_func():
    arduino = serial.Serial('com3', 9600)
    print('Established serial connection to Arduino')
    arduino_data = arduino.readline()

    decoded_values = str(arduino_data[0:len(arduino_data)].decode("utf-8"))
    gasMeasurement = decoded_values

    print(gasMeasurement)
    r = requests.post("https://rodrigue-projects.site/airquality/add", data = {'ppm': gasMeasurement, 'userId':17})
    print(r.text)


    arduino_data = 0
    gasMeasurement = ""
    arduino.close()
    print('Connection closed')
    print('<----------------------------->')


# ----------------------------------------Main Code------------------------------------
gasMeasurement = ""

print('Program started')

schedule.every(600).seconds.do(main_func)

while True:
    schedule.run_pending()
    time.sleep(1)