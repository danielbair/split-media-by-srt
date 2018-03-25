# Description
Split an audio or video file by using a srt timing file.

# Requirements
[NodeJS](https://nodejs.org/en/)  
[FFmpeg](https://www.ffmpeg.org/download.html)
You will need to have ffmpeg available in your system path. The easiest way to do this is to install the [aeneas tools installer](https://github.com/sillsdev/aeneas-installer/releases) which includes ffmpeg.

# Installation
Clone or download this repository.  
Then in a terminal do the following.
```bash
cd split-media-by-srt  
npm install
npm link
```  

# Example
```bash
split-media-by-srt -i ~/MyVideo.m4v -s ~/MyVideo.srt -o ~/Segments/ -f ac3
```  
                                                                                
Note: This script will only copy the source media codec's content and will not convert to another codec.                                                 

# Options
| short | long | description |
| --- | --- | --- |
| -v, | --verbose | Display verbose output |
| -d, | --debug | Display debug information |
| -h, | --help | Display this usage guide |
| -i, | --file <file> | The input media file to process (required) |
| -s, | --srt <file> | The input srt file to process segments (required) |
| -o, | --dir <folder> | The output directory to save the segments (required) |
| -f, | --fmt <format> | The output format to save the segments (optional) [Default: same as source media] |

