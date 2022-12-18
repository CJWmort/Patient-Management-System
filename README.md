# Infocomm System Project (ISP)

Year 3, Semester 1 ISP module industry project working with Thye Hua Kwan Hospital (THKH)

## Statement of Purpose

The purpose of the EHOR application is to digitise the hospital Incident Reporting Process using web-based technology to achieve efficiency in reporting and ease of traceability. It provides a platform for the hospital to manage the process workflow, send reminders and avoid duplication of effort. The data collected may also be used for analysis and report generation.

## General Overview

Ang Mo Kio Thye Hua Kwan Hospital’s entire Incident Reporting Process is manual. Staff putting up the incident report will have to fill up a hard copy form with a pen, and physically pass the hard copy form to multiple senior staff for inputs and endorsement. This presents with a few challenges such as time consuming in routing the reports, analysis of the paper data and human error.    

## Project Description

The project is split between 2 groups, one group focuses on converting incident reporting process from manual to web based.
Whereas the other group (my group, 4 people) focuses on chart data visualisation generated from incident reports & administrator functions. (For site admin to use)

For this project, my group focuses on the administration functions of the application such as:
- Authentication for users accessing the application
- Users can login with their Login ID and Password created for them.

View, Edit & Logout own admin profile
- Display currently logged in admin’s profile information.
- Functions to allow the admin to edit their own profile.
- Log out of the application when done.

Implemented CRUD for users of the EHOR application
- Create new users to access the application.
- Read existing users in the application.
- Update profile information of existing users in the application.
- Delete existing users from the application.

Implemented CRUD for fields used in the Hospital Occurrence Report(HOR)
- Create new fields in the HOR.
- Read existing fields in the HOR.
- Update existing field name or type of existing fields in the HOR.
- Delete existing fields from the HOR.

Generate 8 charts/tables using the hospital data retrieved from the THKH database that are customizable by date
a)      Serious Reportable Event
b)     Monthly Medication related error count by Cat A to I for past 12 months
c)      Medication related error count by Cat A to I for current month
d)     Type of Medication related error count for current year
e)      Monthly Fall-related count by Injury/Non-Injury for past 12 months
f)      Falls Reported (In-Hospital) by severity
g)     Falls Reported (In-Hospital) by ward wing
h)     Falls Reported (In-Hospital) table by ward wing


View reports generated from the EHOR application

## Software and/or Libraries used

- database (xampp v8.0.19): https://www.apachefriends.org/download.html
- composer: https://getcomposer.org/Composer-Setup.exe
- laravel: https://laravel.com/docs/4.2 
- chartjs (cdn): https://cdnjs.com/libraries/Chart.js/2.9.3 
- chartjs datalabels (cdn): https://cdnjs.com/libraries/chartjs-plugin-datalabels
- Integrated development environment (visual studio code): https://code.visualstudio.com/download

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.





