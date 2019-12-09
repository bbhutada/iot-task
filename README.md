## Author: Bhagyashri Bhutada

# iot-task
Device and Driver interaction ( IOT )

This application represents an interactive model illustrating how asynchronous serial communication works between a device and a driver.
Two independent processes are implemented ( a device acts as server and a driver acts as a client ) usine npm library "node-ipc" - It is 
a nodejs module for local and remote Inter Process Communication. 

#### Promise with SetTimeOut (2sec) is used to simulate asynchronous operation
#### CLI interface is provided for the user interaction. Readline module of node.js is used for the implementation. 
#### Both node.js processes are written in latest ES 2017 syntax completely with async/await and latest node.js version (10.15) is used. 
#### "Jest" npm library is used to write Unit tests.
#### Also, code is completely documented along with design/pattern decision description and method usage documentation.

## npm dependencies
1] "node-ipc": "^9.1.1",<br/>
2] "jest": "^24.9.0",<br/>
3] "chalk": "^3.0.0"

## How to run
### Note: Two processes needs to be started ( 1 for device and 1 for driver )
  1. git clone the project
  2. cd iot-task
  3. npm i
  4. node src/device.server.js 
  5. node src/driver.client.js ( Open another tab or terminal and run this)
  6. npm run device.test ( To run unit tests )
  7. npm run driver.test ( To run unit tests )
  
## Configured Inputs & Messages
Possible command configured are as follows
 ```
 1. S: The current, stable weight value is 100.00 g.
 2. +: Balance in overload range.
 3. -: Balance is in underload range.
 4. X: Device is disconnected
 5. %: Command unrecognized, please check and re-enter.
 6: I: Command not executable. Balance is currently executing another command.
 Default value is "S", i.e; when user presses enter without providing any command.
 ```
When both the device and driver processes are started, once device is online it connects to driver and when the connection is acheived driver promts question in command line and waits for user to enter command as shown below
As SetTimeOut( 2sec) is used to simulate asynchronous operation, a delay is expected when the command is enterd.
### Driver Process
```Driver is listening
Welcome to IOT device

$Enter command to get Stable Weight Value: S
Driver: The current, stable weight value is 100.00 g.

$Enter command to get Stable Weight Value: X
Driver: Device is disconnected

$Enter command to get Stable Weight Value: c
Error Occurred: This socket has been ended by the other party with error code EPIPE, Please restart the Device

$Enter command to get Stable Weight Value:
Command was not entered so default command 's' is used
Driver: The current, stable weight value is 100.00 g.

....... so on
```
### Device Process
```
Device is online

Received command: s
Sending value S_S_____100.00_g

Received command: +
Sending value S_+

Received command: X
Sending value S_E
```
## File Structure
<b>src:</b><br/>  It contains all the device & driver code<br/>
1] ./src/cliInterface.js -> Expose cli interface methods for user interaction.<br/>
2] ./src/device.server.js -> Start point of the device.<br/>
3] ./src/driver.client.js -> Start point of the driver and responsible for user Interaction with device.<br/>
4] ./src/ipcConfig -> Exposes new instances of ipc for device & driver with different configuration.<br/>
5] ./src/utils.js -> Exposes helper methods for device and driver communications.<br/>

<b>test:</b><br/> It has both device and driver (driver.test.js & device.test.js) unit tests.<br/>
