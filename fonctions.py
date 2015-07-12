#! /usr/bin/python
# -*- coding:utf-8 -*-
import requests
import json
import os
import yaml

## Octopi fonctions
class Fonctions():
		
		def __init__(self, host="0.0.0.0", port="1000"):

			self.api_baseurl = "http://%s:%i" %(host, port)
			
			with open(os.path.expanduser("~/.octoprint/config.yaml"), 'r') as ymlfile:
				cfg = yaml.load(ymlfile)

			self.apikey = cfg['api']['key']
			
			self.addkey = '?apikey={0}'.format(self.apikey)
			self.apiurl_printhead = '{0}/api/printer/printhead'.format(self.api_baseurl)
			self.apiurl_tool = '{0}/api/printer/tool'.format(self.api_baseurl)
			self.apiurl_bed = '{0}/api/printer/bed'.format(self.api_baseurl)
			self.apiurl_job = '{0}/api/job'.format(self.api_baseurl)
			self.apiurl_status = '{0}/api/printer?apikey={1}'.format(self.api_baseurl, self.apikey)
			self.apiurl_connection = '{0}/api/connection'.format(self.api_baseurl)
			
			self.apiurl_files = '{0}/api/printer/datamodel/sdstate'.format(self.api_baseurl)
			#self.apiurl_files = '{0}/api/printer/state'.format(self.api_baseurl)

			print("Chargement des fonctions ...")
		
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
		
		def home_xy(self):
			data = { "command": "home", "axes": ["0", "0"] }
			print("set x to 0, y to 0")
			# Send command
			self._sendAPICommand(self.apiurl_printhead, data)
			return  
		
		def home_z(self):
			data = { "command": "home", "axes": ["0"] }
			print("set z to 0")
			# Send command
			self._sendAPICommand(self.apiurl_printhead, data)
			return
		
		def jog(self, x, y, z):
			 data = { "command": "jog", "x": x, "y": y, "z": z }
			 print("jog to x:"+x+", y:"+y+", z:"+z)
			 # Send command
			 self._sendAPICommand(self.apiurl_printhead, data)
			 return

		def switch(self, state):
			if(state == 'on'):
				print("allumer les leds")
			else:
				print("eteindre les leds")

			return

		def start_print(self):
			 data = { "command": "start" }
			 print("start printing")
			 # Send command
			 self._sendAPICommand(self.apiurl_job, data)
			 return

		def cancel(self):
			 data = { "command": "cancel" }
			 print("cancel printing")
			 # Send command
			 self._sendAPICommand(self.apiurl_job, data)
			 return

		def pause(self):
			 data = { "command": "pause" }
			 print("pause printing")
			 # Send command
			 self._sendAPICommand(self.apiurl_job, data)
			 return

		def state(self, type):
			 datas = {}

			 if (type == "all"): # Données instantanées
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

			 elif (type == "files"): # Liste des fichiers à imprimer
			 	 print "welcome !"
			 	 try:
					# Get status update
					req = requests.get(self.apiurl_files)

					if req.status_code == 200:
					   datas = json.loads(req.text)
					   print json.dumps(datas)
					   # Remplir data1 avec les données
					else:
					   print "Erreur() : status code - {0} -> {1}".format(req.status_code, req.text)

				 except requests.exceptions.ConnectionError as e:
					print "Connection Error ({0}): {1}".format(e.errno, e.strerror)

			 elif (type == "history"): # Historique de la température
			 	pass

			 return json.dumps(datas)
										
		# Send API-data to OctoPrint
		def _sendAPICommand(self, url, data):
			headers = { 'content-type': 'application/json', 'X-Api-Key': self.apikey }
			print(url)
			r = requests.post(url, data=json.dumps(data), headers=headers)
