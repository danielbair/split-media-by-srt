# Description
Split an audio or video file by using a srt timing file.

# Installation
git clone https://github.com/danielbair/split-media-by-srt.git && cd split-media-by-srt && npm install

# Usage
split-media-by-srt.js -m ~/MyVideo.m4v -s ~/MyVideo.srt -o ~/Segments/ -e ac3 
                                                                                
Note: This script will only copy the source media codec's content and will not convert to another codec.                                                 

# Options
  -v, --verbose        Display verbose output                               
  -d, --debug          Display debug information                            
  -h, --help           Display this usage guide                             
  -f, --file <file>    The input media file to process (required)           
  -s, --srt <file>     The input srt file to process segments (required)    
  -o, --dir <folder>   The output directory to save the segments (required) 
  -e, --fmt <format>   The output format to save the segments (optional)    

