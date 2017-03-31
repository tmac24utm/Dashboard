# Dashboard

## Key Features
* Customisable twitter feed
* Customisable clock
* Traffic map based on user location
* Weather forecast based on user location
* Notepad

## How to use key features
* Customise certain key features on the account settings page
* Notepad is used by click on it

## Design and implementation rationale
* Implementing and designing my features was mostly done using resources already available to me, such as the google maps API. Other things, such as the notepad was implemented using knowledge I already had but styled with help from sites such as w3schools.

## Sources used
* https://dev.twitter.com/web/embedded-timelines
* https://developers.google.com/maps/documentation/javascript/
* https://darksky.net/dev/
* http://ip-api.com

## Mark Scheme

### Functionality
_How appropriate is the design? Does it all work? How much does it do? How much is your own work as opposed to libraries?_
* I believe the design is appropriate, as the UI is laid out in a simple manner and everything is easily accessible on one page, except for the settings.
* It (hopefully) all works
* I believe it does sufficient for an average person, but it is not very customisable
* Libraries/my work is probably around 50/50. 

### Maintainability
_Code style, comprehensibility and maintainability. This includes formatting, file structure, naming - everything that can help your work live on and be useful after it is graded, including how well the code and any documentation communicates any concepts necessary to understand the architecture and configuration of the systems_
* I believe my work is mostly easy to read and maintain. I tried not to go overboard on comments as anyone looking at the files should know what the majority of it does.

### Usability
_Ease-of-use of your system, including the use of event-driven input, background refresh, drag and drop, intuitive UI design, etc._
* I believe my system is easy to use. There is only one other page, which is easily found by clicking on the link in the navbar. The main page only requires user interaction for twitter feed scrolling, map navigation or writing notes. 
* The weather updates every 15 minutes, the map updates consistently

### Accessibility
_The appearance of your pages, including use of CSS and relevant capabilites such that the product is suitable for a diverse audience_
* I believe my pages are quite simple looking, but because of that easy to use and navigate for most users.

### Reflection
_Marked for insight, analysis and evaluation of encountered designs and technologies._
* During the development of my dashboard I had to figure out the best ways of doing certain things. It started with the twitter timeline, which I found the API for, customised it to my liking and then allowed the user to customise what they see using local storage. Then, the map, which used the Google Maps API. However with that, and with the weather, I ran in to some issues with Geolocation not working on unsecure origins (the vm for example) and therefore had to find a workaround, which was eventually done using websockets and getting the location from IP, which also used an API. Finally was the notepad, for which the majority was rather simple, but styling it was difficult and so I used examples from w3schools to help. To style all of this I used Bootstrap, which helped me position everything neatly, and make it responsive if the viewport was resized. An issue I ran in to was making everything fit on to the screen and making sure the user did not have to scroll. Height: 100% always seemed to - at least - include the navbar, and the twitter feed caused issues with being sized. I got around this issue by making the height of the elements based on the VH - the height of the navbar.
* Overall I believe I learned a lot whilst creating this dashboard.
