#! /usr/bin/python
# -*- coding:utf-8 -*-
import requests
import json
import os
import yaml
import netifaces as ni


## Octopi fonctions
class Fonctions():
    def __init__(self, host="0.0.0.0", port="1000"):

        self.api_baseurl = "http://%s:%i" % (host, port)

        with open(os.path.expanduser("~/.octoprint/config.yaml"), 'r') as ymlfile:
            cfg = yaml.load(ymlfile)

        self.apikey = cfg['api']['key']

        self.addkey = '?apikey={0}'.format(self.apikey)
        self.apiurl_printhead = '{0}/api/printer/printhead?apikey={1}'.format(self.api_baseurl, self.apikey)
        self.apiurl_files = '{0}/api/files?apikey={1}'.format(self.api_baseurl, self.apikey)
        self.apiurl_bed = '{0}/api/printer/bed?apikey={1}'.format(self.api_baseurl, self.apikey)
        self.apiurl_extruder = '{0}/api/printer/command?apikey={1}'.format(self.api_baseurl, self.apikey)
        self.apiurl_job = '{0}/api/job?apikey={1}'.format(self.api_baseurl, self.apikey)

        self.apiurl_start_printing = '{0}/api/files/local'.format(self.api_baseurl)

        # curl -H "Content-Type: application/json" --request POST --data '{"command": "cancel"}' --verbose http://0.0.0.0:5000/api/job?apikey=F23EDDA5059840478CDE816B784E3CB3
        # curl -H "Content-Type: application/json" --request POST --data '{"command": "start"}' --verbose http://0.0.0.0:5000/api/job?apikey=F23EDDA5059840478CDE816B784E3CB3

        self.apiurl_tool = '{0}/api/printer/tool'.format(self.api_baseurl)
        self.apiurl_status = '{0}/api/printer?apikey={1}'.format(self.api_baseurl, self.apikey)
        self.apiurl_connection = '{0}/api/connection?apikey={1}'.format(self.api_baseurl, self.apikey)

        print("Chargement des fonctions ...")
        print("API key: " + self.apikey)

    # Reboot system
    def reboot(self):
        os.system("sudo reboot")
        print "reboot"
        return

    # Shutdown system
    def shutdown(self):
        os.system("sudo shutdown -h 0")
        print "shutdown"
        return

    # Set axis X and Y to home
    def home_xy(self):
        data = {"command": "home", "axes": ["x", "y"]}
        print("set x to 0, y to 0")
        # Send command
        self._sendAPICommand(self.apiurl_printhead, data)
        return

    # Set axis Z to home
    def home_z(self):
        data = {"command": "home", "axes": ["z"]}
        print("set z to 0")
        # Send command
        self._sendAPICommand(self.apiurl_printhead, data)
        return

    # Set x axis to the given value
    def jogX(self, x):
        print("jog x to :" + x)
        data = {"command": "jog", "x": float(x)}
        # Send command
        self._sendAPICommand(self.apiurl_printhead, data)
        return

    # Set y axis to the given value
    def jogY(self, y):
        print("jog y to :" + y)
        data = {"command": "jog", "y": float(y)}
        # Send command
        self._sendAPICommand(self.apiurl_printhead, data)
        return

    # Set z axis to the given value
    def jogZ(self, z):
        print("jog z to :" + z)
        data = {"command": "jog", "z": float(z)}
        # Send command
        self._sendAPICommand(self.apiurl_printhead, data)
        return

    # Heat the bed to the given value
    def bed(self, value):
        print("Heat the bed to :" + value)
        data = {"command": "target", "target": float(value)}
        # Send command
        self._sendAPICommand(self.apiurl_bed, data)
        return

    # Heat the extruder to the given value
    def extruder(self, value):
        print("Heat the extruder to :" + value)
        command = 'M109 S{0}'.format(int(value))
        data = {"command": command}
        print("data : " + json.dumps(data))

        # Send command
        self._sendAPICommand(self.apiurl_extruder, data)
        return

    def start_print(self, name=""):
        print("start printing " + name)
        # 2 étapes s'imposent :
        # a/ charger le fichier -H api/files/local/Gear_12.stl --data {"command": "select", "print": false}
        '''
        start_printing_url = self.apiurl_start_printing + "/{0}?apikey={1}".format(name, self.apikey)
        data = {"command": "select", "print": False}
        self._sendAPICommand(start_printing_url, data)
        '''
        # b/ démarrer l'impresssion -H /api/job --data {"command": "start"}
        '''
        data = {"command": "start"}
        self._sendAPICommand(start_printing_url, data)
        '''
        # data = {"command": "select", "print": True}
        return

    def cancel(self):
        data = {"command": "cancel"}
        print("cancel printing")
        # Send command
        self._sendAPICommand(self.apiurl_job, data)
        return

    def pause(self):
        data = {"command": "pause"}
        print("pause printing")
        # Send command
        self._sendAPICommand(self.apiurl_job, data)
        return

    def state(self, type):
        datas = {}

        if (type == "all"):  # Données instantanées
            data1 = {}
            data2 = {}

            try:
                # Get status update
                req = requests.get(self.apiurl_status)

                if req.status_code == 200:
                    data1 = json.loads(req.text)
                    print json.dumps(data1)
                    # Remplir data1 avec les données
                else:
                    print "Erreur(req1) : status code - {0} -> {1}".format(req.status_code, req.text)

            except requests.exceptions.ConnectionError as e:
                print "Connection Error ({0}): {1}".format(e.errno, e.strerror)

            try:
                # Get infos about current job
                req = requests.get(self.apiurl_job + self.addkey)

                if req.status_code == 200:
                    data2 = json.loads(req.text)
                    print json.dumps(data2)
                    # Remplir data2 avec les données
                else:
                    print "Erreur(req2) : status code - {0} | reponse serveur - {1}".format(req.status_code, req.text)

            except requests.exceptions.ConnectionError as e:
                print "Connection Error ({0}): {1}".format(e.errno, e.strerror)

            datas = [data1, data2]

        elif (type == "history"):  # Historique de la température
            pass

        return json.dumps(datas)

    def get_files(self):
        # datas = []
        datas = {
            "files": [
                {
                    "name": "whistle_v2.gcode",
                    "size": 1468987,
                    "date": 1378847754,
                    "origin": "local",
                    "refs": {
                        "resource": "http://example.com/api/files/local/whistle_v2.gcode",
                        "download": "http://example.com/downloads/files/local/whistle_v2.gcode"
                    },
                    "gcodeAnalysis": {
                        "estimatedPrintTime": 1188,
                        "filament": {
                            "length": 810,
                            "volume": 5.36
                        }
                    },
                    "print": {
                        "failure": 4,
                        "success": 23,
                        "last": {
                            "date": 1387144346,
                            "success": True
                        }
                    }
                },
                {
                    "name": "vierge_marie.gcode",
                    "origin": "sdcard",
                    "date": 1378847754,
                    "refs": {
                        "resource": "http://example.com/api/files/sdcard/whistle_.gco"
                    },
                    "gcodeAnalysis": {
                        "estimatedPrintTime": 1188,
                        "filament": {
                            "length": 810,
                            "volume": 5.36
                        }
                    },
                    "print": {
                        "failure": 4,
                        "success": 23,
                        "last": {
                            "date": 1387144346,
                            "success": True
                        }
                    }
                },
                {
                    "name": "coq.gcode",
                    "origin": "sdcard",
                    "date": 1378847754,
                    "refs": {
                        "resource": "http://example.com/api/files/sdcard/whistle_.gco"
                    },
                    "gcodeAnalysis": {
                        "estimatedPrintTime": 1188,
                        "filament": {
                            "length": 810,
                            "volume": 5.36
                        }
                    },
                    "print": {
                        "failure": 4,
                        "success": 23,
                        "last": {
                            "date": 1387144346,
                            "success": True
                        }
                    }
                }
            ],
            "free": "3.2GB"
        }
        '''
        try:
            # Get status update
            req = requests.get(self.apiurl_files)

            if req.status_code == 200:
                datas = json.loads(req.text)
                print json.dumps(datas)
                # Remplir data1 avec les données
            else:
                print "Erreur(get_files) : status code - {0} -> {1}".format(req.status_code, req.text)

        except requests.exceptions.ConnectionError as e:
            print "Connection Error ({0}): {1}".format(e.errno, e.strerror)
        '''
        return json.dumps(datas)

    # General infos
    def get_infos(self):
        ip = ni.ifaddresses('wlan1')[2][0]['addr']
        hostname = os.getenv('HOSTNAME')
        version_bmk = "1.0"
        firmware = "Marlin 2.3"
        tps = "3h33mn3s"
        print 'adresse ip : {0}'.format(ip)
        print 'hostname  : {0}'.format(hostname)
        print 'version_bmk  : {0}'.format(version_bmk)
        print 'firmware  : {0}'.format(firmware)
        print 'tps  : {0}'.format(tps)
        datas = {'ip': ip, 'ap': hostname, 'version_bmk': version_bmk, 'firmware': firmware, 'tps': tps}

        return json.dumps(datas)

    def switch(self, state):
        if (state == 'on'):
            print("allumer les leds")
        else:
            print("eteindre les leds")

        return

    # Send API-data to OctoPrint
    def _sendAPICommand(self, url, data):
        headers = {'content-type': 'application/json'}
        print(url)
        r = requests.post(url, data=json.dumps(data), headers=headers)
