# VisualStudio JavaScript &amp; CSS Outlining 
[![Build status](https://ci.appveyor.com/api/projects/status/f27l3vdcnf942ns2?svg=true)](https://ci.appveyor.com/project/velyo/vs-outlining)
[![Stories in Ready](https://badge.waffle.io/velyo/vs-outlining.svg?label=ready&title=Ready)](http://waffle.io/velyo/vs-outlining)
[![Gitter](https://badges.gitter.im/velyo/vs-outlining.svg)](https://gitter.im/velyo/vs-outlining?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Visual Studio editor extension for JavaScript & CSS code blocks and custom regions outlining.  
As a web developer, I found myself dealing with fast growing *JavaScript* and *CSS* code files.  
And I really missed the code regions in Visual Studio, which is a nice way to organize the code blocks and focus on reasonable small amount of code.  
There are some macros available out on the web for placing a regions outlining in JavaScript code editor.  
I was not fully satisfied with macros and the fact I have to manually run them (even with a shortcut keys) every time a JavaScript file is loaded.  
Thus, I spent some time and came out with a Visual Studio 2010 Editor Extension for JavaScript & CSS Oulining.

## Installation
Download and run the visual studio package installer file (.vsix).  
Open/restart Visual Studio and enjoy :).

## Features

### JavaScript Outlining
#### Code blocks outlining
Outlines JavaScript codeblock regions for the code placed between { }. Both placed on a new line.
Curly braces placed in strings(literals), comments and operators will be omitted.

#### Custom Regions Outlining
Custom outlining regions defined as a special comments for start and end.  
Have in mind the strat and end region definitions could be mixed.  
For example region starting with `/*#> Test */` could be closed with `//#endregion`  
See bellow all availabe long and short forms:
* Region Start
  * `//#region`
  * `//#>`
  * `/*#region Test */`
  * `/*#>*/`
* Region End
  *  `//#endregion`
  * `//#<`
  * `/*#endregion*/`
  * `/*#<*/`

#### Multilines Comment Outlining
Outlining applied to multilines comment placed between `/*` and `*/`.
The outlining will be applied only if the comment is running on more than one line.

#### Multiple lines of Singleline Comments Outlining
Outlining applied to multiple lines of Singleline comments which starts with "//".
The outlining will be applied only if more than one line of comments are placed together.

### CSS Outlining
#### Rule Blocks Outlining
Outlines CSS rule blocks for the code placed between { }. Both placed on a new line.
Curly braces placed in comments will be omitted.

#### Custom Regions Outlining
Custom outlining regions defined as a special comments for start and end.  
Have in mind the strat and end region definitions could be mixed.  
For example region starting with `/*#> Test */` could be closed with `/*#endregion*/`
See bellow all availabe long and short forms:
* Region Start
  * `/*#region Test */`
  * `/*#>*/`
* Region End
  * `/*#endregion*/`
  * `/*#<*/`

#### Multilines Comment Outlining
Outlining applied to multilines comment placed between `/*` and `*/`.
The outlining will be applied only if the comment is running on more than one line.

## Articles of interest
* [Editor Extension Points](http://msdn.microsoft.com/en-us/library/dd885244(v=VS.100).aspx?appId=Dev10IDEF1&l=EN-US&k=k(MICROSOFT.VISUALSTUDIO.TEXT.TAGGING.IVIEWTAGGERPROVIDER);k(TargetFrameworkMoniker-".NETFRAMEWORK&k=VERSION=V4.0");k(DevLang-CSHARP)&rd=true)
* [Walkthrough: Outlining](http://msdn.microsoft.com/en-us/library/ee197665.aspx)
