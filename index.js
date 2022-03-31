/**
 * @author dyeske
 */

function factors(num)
{
	var n_factors = [], i;
	for ( i = 1; i <= Math.floor(Math.sqrt(num)); i += 1) {
		if (num % i === 0) {
			n_factors.push(i);
			if (num / i !== i)
				n_factors.push(num / i);
		}
	}
	n_factors.sort(function(a, b) { return a - b; });
	// numeric sort
	return n_factors;
}

function html_color()
{
	return ("" + tff().toString(16) + tff().toString(16) + tff().toString(16));
}

function tff()
{
	//return Math.floor((Math.random() * seed) % 255);
	var today=new Date();
	var seed=today.getTime();
	return Math.floor((Math.random() * seed) % 255);
}

function ran_color()
{
	document.fgColor=html_color();
	document.vlinkColor=html_color();
	document.linkColor=html_color();
	document.alinkColor=html_color();
	document.bgColor=html_color();
}

function piMonte(n)
{
	var x,y,m=0;
	for(var i = 0; i < n; i += 1) {
		x = Math.random();
		y = Math.random();
		if (x*x + y*y < 1) { m += 1; }
	}
	return 4*m/n;
	//return Math.floor((Math.random() * seed) % 255);
}

function lpi(count)
{
	//var pi = 4*atan2(1,1);
	if (count>0) {
		var Pi=0;
		var n=1;
		for (i=0;i<=count;i++) {
			Pi=Pi+(4/n)-(4/(n+2));
			n=n+4;
		}
		return(Pi);
	} else {
		alert("Canceled or Error in input: Input must be positive.");
	}
}

var LZW = {
	compress: function (uncompressed)
	{
		"use strict";
		// Build the dictionary.
		var i, dictionary = {}, c, wc, w = "", result = [], dictSize = 256;
		for (i = 0; i < 256; i += 1) {
			dictionary[String.fromCharCode(i)] = i;
		}

		for (i = 0; i < uncompressed.length; i += 1) {
			c = uncompressed.charAt(i);
			wc = w + c;
			if (dictionary[wc]) {
				w = wc;
			} else {
				result.push(dictionary[w]);
				// Add wc to the dictionary.
				dictionary[wc] = dictSize++;
				w = String(c);
			}
		}
		// Output the code for w.
		if (w !== "") { result.push(dictionary[w]); }
		return result;
	},

	decompress: function (compressed)
	{
		"use strict";
		// Build the dictionary.
		var i, dictionary = [], w, result, k, entry = "", dictSize = 256;
		for (i = 0; i < 256; i += 1) {
			dictionary[i] = String.fromCharCode(i);
		}

		w = String.fromCharCode(compressed[0]);
		result = w;
		for (i = 1; i < compressed.length; i += 1) {
			k = compressed[i];
			if (dictionary[k]) {
				entry = dictionary[k];
			} else {
				if (k === dictSize) {
					entry = w + w.charAt(0);
				} else {
					return null;
				}
			}
			result += entry;
			// Add w+entry[0] to the dictionary.
			dictionary[dictSize++] = w + entry.charAt(0);
			w = entry;
		}
		return result;
	}
};

function showMacAddress()
{
	var obj = new ActiveXObject("WbemScripting.SWbemLocator");
	var s = obj.ConnectServer(".");
	//var properties = s.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration where MACAddress <> null");
	var properties = s.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration");
	var e = new Enumerator (properties);
	var output='<table border="0" cellPadding="5px" cellSpacing="1px" bgColor="#CCCCCC">';
	output=output + '<tr bgColor="#EAEAEA"><td>Caption</td><td>MACAddress</td><td>IP</td></tr>';
	while(!e.atEnd())
	{
		var p = e.item ();
		if(!p) continue;
		output=output + '<tr bgColor="#FFFFFF">';
		output=output + '<td>' + p.Caption; + '</td>';
		output=output + '<td>' + p.MACAddress + '</td>';
		output=output + '<td>' + p.IPAddress(0) + '</td>';
		output=output + '</tr>';
		e.moveNext();
	}
	output=output + '</table>';
	return output;
}

function show_Win32_BaseBoard() {
	var obj = new ActiveXObject("WbemScripting.SWbemLocator");
	var s = obj.ConnectServer(".");
	var properties = s.ExecQuery("SELECT * FROM Win32_BaseBoard");
	var e = new Enumerator (properties);
	var output='<table border="0" cellPadding="5px" cellSpacing="1px" bgColor="#CCCCCC">';
	output+= '<tr bgColor="#EAEAEA"><td>Caption sex</td> <td>IP</td></tr>';
	var z, p, t, props;
	for (; !e.atEnd(); e.moveNext()) {
		p = e.item ();
		if(!p) continue;
		eprops = new Enumerator(p.Properties_);
		for (; !eprops.atEnd(); eprops.moveNext()) {
			z = eprops.item();
			output+= '<tr bgColor="#FFFFFF">';
			output+= '<td>' + p.Name + ':' + z.Name + '</td>';
			try {
				output+= '<td>' + z.Value.toArray().join(",") + '</td>';
			} catch(err) {
				output+= '<td>' + z.Value + '</td>';
			}
			output+= '</tr>';
		}
	}
	output+= '</table>';
	return output;
}

function showBIOS() {
	var obj = new ActiveXObject("WbemScripting.SWbemLocator");
	var s = obj.ConnectServer(".");
	var properties = s.ExecQuery("SELECT * FROM Win32_BIOS");
	var e = new Enumerator (properties);
	var output='<table border="0" cellPadding="5px" cellSpacing="1px" bgColor="#CCCCCC">';
	output+= '<tr bgColor="#EAEAEA"><td>Caption</td> <td>IP</td></tr>';
	var z, p, t, props;
	for (; !e.atEnd(); e.moveNext()) {
		p = e.item ();
		if(!p) continue;
		eprops = new Enumerator(p.Properties_);
		for (; !eprops.atEnd(); eprops.moveNext()) {
			z = eprops.item();
			output+= '<tr bgColor="#FFFFFF">';
			output+= '<td>' + p.Name + ':' + z.Name + '</td>';
			try {
				output+= '<td>' + z.Value.toArray().join(",") + '</td>';
			} catch(err) {
				output+= '<td>' + z.Value + '</td>';
			}
			output+= '</tr>';
		}
	}
	output+= '</table>';
	return output;
}

function getwmi(myclass)
{
	WScript.Echo("running getwmi");
	var sql = "SELECT * from " + myclass;
	var query = GetObject("winmgmts:").ExecQuery(sql);
	var e = new Enumerator(query);
	var p, eprops, oPS;

	for (; !e.atEnd(); e.moveNext()) 
	{
		oPS = e.item();
		eprops = new Enumerator(oPS.Properties_);
		var str = "";
		for (; !eprops.atEnd(); eprops.moveNext())
		{
			p = eprops.item();
			str+= p.Name + "::" + p.Value + "\n";
		}
		WScript.Echo(str);
	}
}

function runshell()
{
	var shell = new ActiveXObject("WScript.Shell");
	var e = shell.Exec("%comspec% /c ping -4 google.com 2>&1 ");
	var output;
	while(!e.StdOut.AtEndofStream) {
		var line = e.StdOut.ReadLine();
		output+= line + '<br>';
	}
	return output;
}

//CreateObject("Wscript.Shell").Run "your_batch_file.bat", 0, True

function getNetwork()
{
	var WinNetwork = new ActiveXObject("WScript.Network");
	var output = WinNetwork.UserName + '<br>';
	output+= WinNetwork.computername + '<br>';
	return output;
}

//var i = arr.length; while (i--) {}

function dumpvar(str)
{
	var	txt = "";
	//txt+= str;
	//var o;
	//var fName = arguments.callee.toString(0).match( /^function\s*(?:\s+([\w\$]*))?\s*\(/ );
	//var myName = arguments.callee.toString();
	//myName = myName.substr('function '.length);
	//myName = myName.substr(0, myName.indexOf('('));
	//txt+= 'myName->' + myName + ' ';
	//txt+= 'this.toString()->' + this.toString() + '   ';

	txt+= str + '->' + eval(str);
	return txt;
}  

Array.prototype.quick_sort = function ()
{
	if (this.length <= 1)
		return this;

	var pivot = this[Math.round(this.length / 2)];

	return this.filter(function (x) { return x <  pivot }).quick_sort().concat(
			this.filter(function (x) { return x == pivot })).concat(
			this.filter(function (x) { return x >  pivot }).quick_sort());
}

function llockworkstation()
{
	var shell = new ActiveXObject("WScript.Shell");
	var e = shell.Exec("%windir%\\System32\\rundll32.exe user32.dll,LockWorkStation");
}

function lockworkstation()
{
	var shell = new ActiveXObject("WScript.Shell");
	var e = shell.Exec("%windir%\\System32\\rundll32.exe user32.dll,LockWorkStation");
}

function runme(cmd)
{
	var shell = new ActiveXObject("WScript.Shell");
	var foo = shell.Exec(cmd);
	var pid = foo.ProcessID;
	var lines = "";

	while(!foo.StdOut.AtEndofStream) {
		var line = foo.StdOut.ReadLine();
		line += '<br>';
		lines += line;
	}
	foo.StdIn.Close();
	return lines;
}

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";

	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];

			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

//function getenv(var)
//{
//var shell = new ActiveXObject("WScript.Shell");
//var env = shell.Environment(var);
//WScript.echo('SYSTEMROOT=' + env.item('SYSTEMROOT'));
//return env;
//WScript.echo('getenvff()');
//var shell = new ActiveXObject("WScript.Shell");
//var env = shell.Environment("PROCESS");
//WScript.echo('SYSTEMROOT=' + env.item('SYSTEMROOT'));
//WScript.echo('SYSTEMROOT=' + env.item('SYSTEMROOT'));
//return env.item('SYSTEMROOT');
//return env.item(var);
//
//}

function typeOf(value) {
	var s = typeof value;
	if (s === 'object') {
		if (value) {
			if (value instanceof Array) {
				s = 'array';
			}
		} else {
			s = 'null';
		}
	}
	return s;
}

