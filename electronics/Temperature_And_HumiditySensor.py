import serial
import time
import schedule
import requests

def main_func():
    arduino = serial.Serial('com4', 9600)
    print('Established serial connection to Arduino')
    arduino_data = arduino.readline()

    decoded_values = str(arduino_data[0:len(arduino_data)].decode("utf-8"))
    list_values = decoded_values.split('x')

    for item in list_values:
        list_in_floats.append(float(item))

    print(f'Collected readings from Arduino: {list_in_floats}')
    r = requests.post("https://rodrigue-projects.site/temperature/add", data = {'temperature':list_in_floats[0], 'userId':1})
    r2 = requests.post("https://rodrigue-projects.site/humidity/add", data = {'airHumidity':list_in_floats[1], 'userId':1})

    print(r.text)
    print(r2.text)

    arduino_data = 0
    list_in_floats.clear()
    list_values.clear()
    arduino.close()
    print('Connection closed')
    print('<----------------------------->')


# ----------------------------------------Main Code------------------------------------
list_values = []
list_in_floats = []

print('Program started')

schedule.every(3).seconds.do(main_func)

while True:
    schedule.run_pending()
    time.sleep(1)