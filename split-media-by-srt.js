#!/usr/bin/env node

//var debug = require('debug')('cc');

const optionDefinitions = [
	{
		name: 'verbose',
		alias: 'v',
		description: 'Display verbose output',
		type: Boolean
	},
	{
		name: 'debug',
		alias: 'd',
		description: 'Display debug information',
		type: Boolean
	},
	{
		name: 'help',
		alias: 'h',
		description: 'Display this usage guide',
		type: Boolean
	},
	{
		name: 'file',
		alias: 'i',
		description: 'The input media file to process (required)',
		typeLabel: '<file>',
		type: String
	},
	{
		name: 'srt',
		alias: 's',
		description: 'The input srt file to process segments (required)',
		typeLabel: '<file>',
		type: String
	},
	{
		name: 'dir',
		alias: 'o',
		description: 'The output directory to save the segments (required)',
		typeLabel: '<folder>',
		type: String
	},
	{
		name: 'fmt',
		alias: 'f',
		description: 'The output format to save the segments (optional)',
		typeLabel: '<format>',
		type: String
	}
]

const commandLineArgs = require('command-line-args');
const options = commandLineArgs(optionDefinitions);

function displayHelp () {
	const commandLineUsage = require('command-line-usage');
	const usage = commandLineUsage([
		{
			header: 'Usage',
			content: 'split-media-by-srt.js -i ~/MyVideo.m4v -s ~/MyVideo.srt -o ~/Segments/ -f aac\n\nNote: This script will only copy the source media codec`s content and will not convert it to another codec.'
		},
		{
			header: 'Options',
			optionList: optionDefinitions
		},
		{
			content: 'Project home: https://github.com/danielbair/split-media-by-srt'
		}
	])
	console.log(usage)
}

if ( options.help == true ) {
	displayHelp();
}else{
	if ( options.debug == true ) {
		console.log(options);
	}

	if ( !options.file || !options.srt || !options.dir ) {
		displayHelp();
		process.exit(1);
	}

	var parser = require('subtitles-parser');
	var path = require('path');
	var fs = require('fs');

	if (fs.existsSync(options.dir)) {

		var srtData = fs.readFileSync(options.srt,'utf8');
		if ( options.debug == true ) {
			console.log(srtData);
		}

		var jsonSubs = parser.fromSrt(srtData);
		if ( options.debug == true ) {
			console.log(jsonSubs);
		}

		const execSync = require('child_process').execSync;
		jsonSubs.forEach(function (sub) {
			/*
			 * ffmpeg -i BIG_FILE -acodec copy -ss START_TIME -to END_TIME LITTLE_FILE
			 */
			console.log("Processing segment: "+sub.id);
			if ( options.debug == true ) {
				console.log(sub);
			}
			var fileExt = path.extname(options.file);
			if ( options.fmt ) {
				var fileExt = "."+options.fmt;
			}
			var newFile = path.basename(options.file,path.extname(options.file))+"-"+sub.id+fileExt;
			var splitCmd = 'ffmpeg -i "'+options.file+'" -acodec copy -ss '+sub.startTime.replace(",",".")+' -to '+sub.endTime.replace(",",".")+' -y "'+options.dir+newFile+'"';
			if ( options.debug == true ) {
				console.log(splitCmd);
			}
			var results = execSync(splitCmd).toString();
			if ( options.verbose == true ) {
				console.log(results);
			}
		})

	}else{
		console.log('ERROR: Output folder does not exist.');
	}
}
