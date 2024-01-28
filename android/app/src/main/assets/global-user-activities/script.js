const persons = [
  'Tomas Veum',
  'Emmett Gusikowski',
  'Neil Ritchie',
  'Wilson Armstrong',
  'Nathaniel Gutkowski',
  'Neal Donnelly',
  'Roger Kuhic',
  'Mark Mills',
  'Darrin Graham',
  'Arturo West',
  'Stuart Yost',
  'Darin Herzog',
  'Miguel Abernathy',
  'Daryl Bashirian',
  'Shannon Hammes',
  'Francis Runolfsdottir',
  'Keith Wisozk',
  'Bert Murray',
  'Alvin Blanda',
  'Eric Senger',
  'Francisco Stracke',
  'Rudy Renner',
  'Roger Olson',
  'Guy Bode',
  'Moses Schuppe',
  'Felix Schneider',
  'Brendan Harris',
  'Sean Lockman',
  'Walter Leannon',
  'Alton Prosacco',
  'Van Kuhn',
  'Preston Bauch',
  'Julio Rogahn',
  'Jeremiah Turcotte',
  'Woodrow Armstrong',
  'Homer Skiles',
  'Javier Wintheiser',
  'Clinton Effertz',
  'Oscar Kozey',
  'Mark Bosco',
  'Wilbert Waelchi',
  'Sherman Smitham',
  'Richard Jenkins',
  'Garry Dickinson',
  'Kyle Jakubowski',
  'Brett Bechtelar',
  'Bob Jerde',
  'Karl Hickle',
  'George Rogahn',
  'Eddie Littel',
  'Darryl Walsh',
  'Alexander Gottlieb',
  'Seth Stroman',
  'Terry Wiza',
  'Alton Kreiger',
  'Timmy Moore',
  'Sean Smith',
  'Conrad Hayes',
  'Santiago Rolfson',
  'Felix Frami',
  'Travis Mertz',
  'Winston Jaskolski',
  'Clinton Wunsch',
  'Darrell Nolan',
  'Spencer Glover',
  'Martin Feeney',
  'Steve Cremin',
  'Santiago Conroy',
  'Jeremiah Block',
  'Nelson Paucek',
  'Guillermo Wisozk',
  'Cecil Hessel',
  'Ted Kerluke',
  'Marty Schultz',
  'Gregory Hirthe',
  'Douglas Hoppe',
  'Archie Collins',
  'Andrew Fadel',
  'Benjamin Kohler',
  'Roger Gleason',
  'Alfredo Braun',
  'Mack Dare',
  'Jerry Koss',
  'Alfred Hamill',
  'Leslie Gaylord',
  'Brad Dach',
  'Gerardo Wolf',
  'Wm Corkery',
  'Arnold Walter',
  'Tom Wiza',
  'Willis Fahey',
  'Theodore Shanahan',
  'Thomas Runolfsson',
  'Ryan Tromp',
  'Philip Koch',
  'Bert Mitchell',
  'Kristopher Tillman',
  'Douglas Murphy',
  'Chad Parisian',
  'Clint Kuphal',
  'Alfonso Goldner',
  'Claude Considine',
  'Guillermo Krajcik',
  'Adam Bartoletti',
  'Dwight MacGyver',
  'Ben Bradtke',
  'Erick Terry',
  'Casey Ritchie',
  "Salvador O'Keefe",
  'Carl Boehm',
  'Marlon Hackett',
  'Tomas Lueilwitz',
  'Wm Boehm',
  'Colin Collier',
  'Brent Howell',
  'Francisco Emmerich',
  'Jessie Jaskolski',
  'Taylor Schiller',
  'Glen Ruecker',
  'Clayton Mann',
  'Perry Rau',
  'Jackie Dickens',
  'Edmond Turner',
  'Marco Paucek',
  'Ivan Sporer',
  'Jorge Quigley',
  'Jamie Brekke',
  'Orville Bednar',
  'Edmund Orn',
  'Laurence Beahan',
  'Corey Botsford',
  'Dennis Romaguera',
  'Cameron Towne',
  'Manuel Dickens',
  'Cory Gutkowski',
  'Hugh Auer',
  'Eugene Koelpin',
  'Nathan Kuhic',
  'Santos Treutel',
  'Douglas Wisozk',
  'Orlando Considine',
  'Jaime Crooks',
  'Wendell Haag',
  'Andrew Berge',
  'Dana Macejkovic',
  'James Oberbrunner',
  'Wilfred Okuneva',
  'Spencer Kiehn',
  'Isaac Huels',
  "Israel O'Conner",
  'Marc Nienow',
  'Francisco Kuphal',
  'Daniel Greenholt',
  'Kyle Champlin',
  'Clayton Cassin',
  'Phillip Leannon',
  'Harold Parker',
  'Cecil Conn',
  'Clint Altenwerth',
  'Freddie Gaylord',
  'Don Kohler',
  'Mark Bogan',
  'Darren Powlowski',
  'Karl Hahn',
  'Darrel Doyle',
  'Manuel Glover',
  'Willard Kuhic',
  'Dwayne Heller',
  'Percy Hilpert',
  'Derrick Grimes',
  'Kyle Bartoletti',
  'Sheldon Grady',
  'Ivan Fahey',
  'Pedro Christiansen',
  'Wallace Hauck',
  'Herman Shanahan',
  'Lonnie Marquardt',
  'Rufus Nienow',
  'Stanley Williamson',
  'Ernesto Rosenbaum',
  'Terrell Maggio',
  'Randal Jacobi',
  'Juan Hudson',
  'Don Kuhlman',
  'Nelson Beahan',
  'Dexter Krajcik',
  'Spencer Stamm',
  'Christopher Larson',
  'Alfredo Zieme',
  'Wm Cruickshank',
  'Alejandro Pagac',
  'Merle Ritchie',
  'Julian Von',
  'Geoffrey Fritsch',
  'Sammy McDermott',
  'Lionel Rosenbaum',
  'Earl Keebler',
  'Bradford Flatley',
  'Kelly Wilderman',
  'Nicholas Adams',
  'Joshua Jacobi',
  'Cornelius Bosco',
  'Orville Kreiger',
  'Gregg Adams',
  'Dominick Schulist',
  'Edmond Johnston',
  'Tom Collins',
  'Russell Smith',
  'Milton Kshlerin',
  'Merle Lynch',
  'Leo Lemke',
  'Pete Quigley',
  'Dallas Hayes',
  'Reginald Langosh',
  'Clifton Shields',
  "Pedro O'Connell",
  'Drew Larkin',
  'Dan Rolfson',
  'Conrad Abernathy',
  'Christopher Kilback',
  'Lloyd Tremblay',
  'Guadalupe Kerluke',
  'Eduardo Armstrong',
  'Simon Weissnat',
  'Ralph McDermott',
  'Jake McKenzie',
  'Ervin Kutch',
  'Carroll Goodwin',
  'Tyler VonRueden',
  'Dominic Ryan',
  'Floyd Rutherford',
  'Dominick Berge',
  'Israel Hodkiewicz',
  'Wallace Grimes',
  'Lionel Hills',
  'Gerardo Hoeger',
  'Casey Purdy',
  'Virgil Carter',
  'Wallace Dickens',
  'Martin Frami',
  'Brandon Skiles',
  'Stanley Glover',
  'Al Jast',
  'Jared Gulgowski',
  'Andy Lockman',
  'Alejandro Heathcote',
  'Doug Huels',
  'Van Kessler',
  'Gabriel Will',
  'Wallace Crona',
  'Lucas Blanda',
  'Allen Watsica',
  'Kelvin Jones',
  'Perry Koepp',
  'Toby Mitchell',
  'Donald Sporer',
  'Clayton Bashirian',
  'Everett Reichel',
  'Shaun Nicolas',
  'Orlando Lubowitz',
  'Gerardo Kuhlman',
  'Daniel Daugherty',
  'Frankie Kuphal',
  'Gene Nicolas',
  "Phil O'Kon",
  'Walter Runte',
  'Norman Schmitt',
  'Jim Davis',
  "Joel D'Amore",
  'Cameron Koepp',
  'Bradford Hudson',
  'Timmy Altenwerth',
  'Jermaine Hagenes',
  'Drew Bayer',
  'Terrell Stanton',
  'Ricky Moen',
  'Rudolph Kerluke',
  'Jorge Lynch',
  'Geoffrey Homenick',
  'Leon Jenkins',
  'Leslie Bruen',
  'Clifford Heathcote',
  'Gabriel Schmidt',
  'Jeremiah Mosciski',
  'Irving Brakus',
  'Juan VonRueden',
  'Sylvester Stokes',
  'Cory Reichert',
  'Franklin Quitzon',
  'Oscar Tremblay',
  'Clarence Bartoletti',
  'Erik Sporer',
  'Emanuel Langosh',
  'Hugh Sporer',
  'Courtney Bins',
  'Chad Doyle',
  "Shane O'Keefe",
  'Gregg Greenholt',
  'Chad Beier',
  'Ron Purdy',
  'Toby Bergstrom',
  'Roy Dach',
  'Jared Maggio',
  'Frederick McKenzie',
  'Daniel Ullrich',
  'Rafael Dickinson',
  'Dave Kozey',
  'Gordon Rath',
  'Eduardo Stokes',
  'Noel Ryan',
  'Eddie Ondricka',
  'Courtney Lynch',
  'Conrad Hand',
  'Levi Zemlak',
  'Ivan Orn',
  'Sheldon Flatley',
  'Preston Ziemann',
  'Lawrence Simonis',
  'Tommie Tillman',
  'Juan Wiegand',
  'Rafael Mueller',
  'Alfredo Hayes',
  'Gerald Parisian',
  'Edmund Rippin',
  'Ramon Watsica',
  'Phil Ullrich',
  'Arnold Bergnaum',
  'Gerald Kassulke',
  'Chad Cremin',
  'Claude Rath',
  'Sherman Hayes',
  'Conrad Schultz',
  'Frederick Littel',
  'Winston Treutel',
  'Hugh Metz',
  'Gustavo Frami',
  'Ellis Goldner',
  'Marcos Huel',
  'Corey Bradtke',
  'Amos Parker',
  'Clay Rippin',
  'Luther Nicolas',
  'Donnie McClure',
  'Pablo Halvorson',
  'Domingo Becker',
  'Timothy Herzog',
  'Julius Swift',
  'Jonathon Feest',
  'Rogelio Kuhn',
  'Johnny Littel',
  'Forrest Tillman',
  'Freddie Hyatt',
  'Steven Dibbert',
  'Erik Treutel',
  'Pat Collier',
  'Wilson Kutch',
  'Tony Tremblay',
  'Leon Stiedemann',
  'Alton Franecki',
  'Timothy Lynch',
  'Emanuel Hane',
  'Arturo Considine',
  'Jason Medhurst',
  'Ron Wilkinson',
  'Kurt Stamm',
  'Ismael Zieme',
  'Laurence Cronin',
  'Owen Jaskolski',
  'Johnny Dare',
  'Noah Witting',
  'Patrick Nolan',
  'Benjamin Okuneva',
  'Laurence Lesch',
  'Merle Quitzon',
  'Mario Wisozk',
  'Ross Bogan',
  'Dominic Becker',
  'Ellis Fahey',
  'Rex Stracke',
  'Benjamin Bayer',
  'Jackie Baumbach',
  'Dexter Schinner',
  'Raul Walker',
  'Kurt Miller',
  'Terrance Spinka',
  'Ellis Ryan',
  'Winston Fisher',
  'Norman Powlowski',
  'Barry Davis',
  'Sylvester Cummerata',
  'Stephen Pagac',
  'Amos Johnson',
  'Bert Bahringer',
  'Carl Jast',
  'Lionel Upton',
  'Van Dietrich',
  'Jake Hammes',
  'Rene Kassulke',
  'Dominic Moen',
  'Raul Heaney',
  'Leo Prohaska',
  'Gerard Bosco',
  'Ed Hayes',
  'Dallas Collier',
  'Jonathan Johnson',
  'Christian Jacobson',
  'Brett Zieme',
  'Duane Collins',
  'Joseph Halvorson',
  'Fernando Lueilwitz',
  'Marion Mueller',
  'Theodore Bergnaum',
  'Elijah Hand',
  'Keith Block',
  'Glenn Gerlach',
  'Ronnie Christiansen',
  'Harold Aufderhar',
  'Jan Homenick',
  'Darnell Ortiz',
  'Brett Harvey',
  'Marty Klocko',
  'Freddie Maggio',
  "Kim O'Kon",
  'Jerry Abernathy',
  'Gerard Carroll',
  'Kenneth Pfeffer',
  'Rene Rodriguez',
  'Dallas Mante',
  'Ismael Quitzon',
  'Randolph Littel',
  'Max Koelpin',
  'Courtney Rippin',
  'Jeffery Larkin',
  'Gerald Prohaska',
  'Willis Langosh',
  'Eddie Batz',
  'Tomas Luettgen',
  'Forrest Orn',
  'Victor Harvey',
  'Nick Swift',
  'Marty King',
  'Clyde Langworth',
  'Carlos Ondricka',
  'Delbert Miller',
  'Bryant Robel',
  'Terrence Goyette',
  'Jean Huels',
  'Byron Hickle',
  'Nathan Tromp',
  'Leonard Turner',
  'Jon Skiles',
  'Stewart Langosh',
  'Wilbur Barton',
  'Corey Gorczany',
  'Tomas Schuppe',
  'Jesse Pfannerstill',
  'Darrel Feest',
  'Orlando Schneider',
  'Felipe Mueller',
  'Wayne Harber',
  'Ricky Williamson',
  'Sylvester Zboncak',
  'Luther Hansen',
  'Elmer Nader',
  'Erick Walker',
  'Leroy Batz',
  'Sherman Pagac',
  'Vernon Strosin',
  'Rogelio Morissette',
  'Gordon Hane',
  'Ira Cruickshank',
  'Bradley Farrell',
  'Marty Dickinson',
  'Elbert Mills',
  'Bryan Doyle',
  'Cecil Pacocha',
  'Herman Dooley',
  'Max Gibson',
  'Emilio Ratke',
  'Rudolph Ondricka',
  'Ramiro Upton',
  'Jeff Schinner',
  'Adam Osinski',
  'Ross Keeling',
  'Milton Hammes',
  'Jack Kozey',
  'Ted Armstrong',
  'Stephen Connelly',
  'Todd Mueller',
  'Moses Herman',
  'Gene Veum',
  'Wilson Sawayn',
  'Bradley Williamson',
  'Roland Conn',
  'Arturo Langworth',
  'Samuel Boehm',
  'Floyd Heaney',
  'Tyler Schneider',
  'Woodrow Sanford',
  'Stewart Zboncak',
  'Douglas Heathcote',
  'Dwayne Senger',
  'Roman Walsh',
  'Claude Lemke',
  'Fred Homenick',
  'Keith Quigley',
  'Shaun Haley',
  'Gerardo Schowalter',
  'Pete Champlin',
  'Enrique Tremblay',
  'Jason VonRueden',
  'Derek Hansen',
  'Myron Sauer',
  'Tracy Collier',
  'Ralph Wisoky',
  'Clark Gusikowski',
  'Brian Howe',
  'Danny Frami',
  'Terrence Jacobi',
  'Wilfred Schowalter',
  'Alex Carter',
  'Alvin Turner',
  'Randall Cartwright',
  'Willie Rutherford',
  'Richard Herman',
  'Kyle Weber',
  'Jimmie Brown',
  'Chester Ferry',
  'Raymond Orn',
  'Jesse Witting',
  'Chester Labadie',
  'Jack Brekke',
  'Derek Gorczany',
  'Kurt Okuneva',
  'Leonard Ledner',
  'Spencer Pfeffer',
  'Frank Powlowski',
  'Marco Moen',
  'Robin Rath',
  'Rudolph Fadel',
  'Kent Mosciski',
  'Simon Davis',
  'Geoffrey Skiles',
  'Francis Thompson',
  'Norman Rogahn',
  'Roman Considine',
  'Jerry Armstrong',
  'Justin Kautzer',
  'Chris Grady',
  "Ronnie O'Reilly",
  'Duane Runolfsdottir',
  'Tommie Waters',
  'Lonnie Smith',
  'Cody Volkman',
  'Gerard Murazik',
  'Ron Greenholt',
  "Jean O'Reilly",
  'Don Dickinson',
  'Timothy Hahn',
  'Glen Haag',
  'Robert Braun',
  'Jon Becker',
  'Eugene Gerhold',
  'Frederick Volkman',
  'Lionel Heller',
  'Dale Kuhlman',
  'Santiago Graham',
  'Roger Rau',
  'Carroll Rohan',
  'Randal Howell',
  'Bradford Shields',
  'Alex Doyle',
  'Felipe Satterfield',
  'Kelvin Hartmann',
  'Oliver Wisozk',
  'Grady Kuphal',
  'Garrett McCullough',
  'Edward Kessler',
  'Gerardo Auer',
  'Myron Purdy',
  'Travis Nikolaus',
  'Elbert Hackett',
  'Jackie Schimmel',
  'Derek Rempel',
  'Earl Stamm',
  'Victor Russel',
  'Roberto Wyman',
  'Courtney Boyle',
  'Thomas McClure',
  'Walter Kreiger',
  'Jody Runolfsdottir',
  'Alex Hagenes',
  'Ervin Schamberger',
  'Lewis Heathcote',
  'Pete Grant',
  'Abraham Brown',
  'Bruce Swaniawski',
  'Clifford Stark',
  "Roland O'Reilly",
  'Harry King',
  'Ronnie Hilll',
  'Cory Yundt',
  'Garry Gorczany',
  'Karl Vandervort',
  'Clifton Mueller',
  'Ernest Watsica',
  'Lee Stokes',
  'Julius Wuckert',
  'Albert Kuhlman',
  'Dave Jacobi',
  'Marlon DuBuque',
  'Taylor Gaylord',
  'Al Funk',
  'Edmond Lehner',
  'Ed Schaden',
  'Philip Conn',
  'Darrell Bayer',
  'Marcus Jacobs',
  'Raul Kiehn',
  'Kerry Mraz',
  'Wilson Gulgowski',
  'Jimmy Rohan',
  'Ervin Balistreri',
  'Fernando Kunze',
  'Carroll Streich',
  'Ramiro Kerluke',
  'Guillermo Lynch',
  'Clayton Dibbert',
  'Douglas Dicki',
  'Ralph Bernier',
  'Levi Anderson',
  'Stewart Weimann',
  'Brad Herman',
  'Calvin Stehr',
  'Nicolas Ziemann',
  'Marlon Sanford',
  'Roderick Donnelly',
  'Alex Shanahan',
  'Wesley Funk',
  'Courtney Gusikowski',
  'Ervin Stamm',
  'Dwight Schmeler',
  'Max Olson',
  'Howard Bartoletti',
  'William Roob',
  'James Bernier',
  'Omar Hegmann',
  'Francis Stamm',
  'Richard Gislason',
  'Preston Welch',
  'Eugene Torp',
  'Abraham Watsica',
  'Felipe Gaylord',
  'Dwight Stiedemann',
  'Kim Aufderhar',
  'Edgar Purdy',
  'Eric Cassin',
  'Bobby Kreiger',
  'Orlando Denesik',
  'Jaime Carroll',
  'Dale Brown',
  'Darrel Schmitt',
  'Jeremy Leannon',
  'Omar Mann',
  'Eddie Jenkins',
  'Jon Koepp',
  'Mitchell Schaden',
  'Courtney Mertz',
  'Glen Bergnaum',
  'Clinton Wolf',
  'Benjamin Reichel',
  'Roberto Goyette',
  'Arnold Quigley',
  'Curtis Langworth',
  'Geoffrey Erdman',
  'Pete Waters',
  'Marcus Fisher',
  "Brett O'Hara",
  'Tony Gleichner',
  'Garry Hermiston',
  'Pablo Tremblay',
  'Jordan Ledner',
  'Tommy Sipes',
  'Angelo Wolff',
  'Neil Conroy',
  'Fred Hilll',
  'Otis Wolff',
  'Gregory Kuhic',
  'Karl Kling',
  'Orlando Sipes',
  'Charlie Hintz',
  'Shannon Frami',
  'Wesley Jaskolski',
  'Billy Rodriguez',
  'Winston Stamm',
  'Jessie Sawayn',
  'Brendan Mayert',
  'Jaime Olson',
  'Conrad Metz',
  'Jeremy Feeney',
  'Noel Wuckert',
  'Ernest Crona',
  'Bob Lowe',
  'Nicolas Boyle',
  'Roger Nitzsche',
  'Leonard Kling',
  'Jose Hilpert',
  'Ellis McClure',
  'Richard Hand',
  'Felix Pfeffer',
  'Alfonso Ziemann',
  'Lee Trantow',
  'Ross Weimann',
  'Jackie Huels',
  'Raymond Lang',
  'Matt Stanton',
  'Gregg Balistreri',
  'Malcolm West',
  'Morris Pollich',
  'Clifton Schinner',
  'Delbert Mueller',
  'Jim Mayert',
  'Ernest McLaughlin',
  'Jeffery Fisher',
  'Gordon Langworth',
  'Clyde Fisher',
  'Elijah Parisian',
  'Bernard Keebler',
  'Sammy Hilpert',
  'Dominick Morissette',
  'Aaron Metz',
  'Bradley Hackett',
  'Clyde Wyman',
  'Sheldon Spinka',
  'Lawrence Pagac',
  'Carroll Carter',
  'Bert Watsica',
  'Grady Carroll',
  'Donnie Murphy',
  'Kelly Marquardt',
  'Lawrence Berge',
  'Craig Bosco',
  'Tyler King',
  'Freddie Doyle',
  'Sean Huels',
  'Jeff Leannon',
  'Van Rempel',
  'Sam King',
  'Randy Hilpert',
  'Darren Kuhn',
  'Darin Lueilwitz',
  'Kurt Kozey',
  'Charlie Heidenreich',
  'Wayne Fay',
  'Gordon Rolfson',
  'Dustin Hintz',
  'Todd Mraz',
  'Leland Cassin',
  'Clayton Braun',
  'Leonard Kling',
  'Willis Jones',
  'Bob Windler',
  'Jacob Wyman',
  "Benny O'Hara",
  'Howard Predovic',
  'Nicolas Stehr',
  'Carl Bartell',
  'Jonathan Simonis',
  'Ellis Rowe',
  'Patrick Bergstrom',
  'Howard Schroeder',
  'Rene Rowe',
  'Micheal Greenholt',
  'Freddie Bartell',
  'Enrique Hermann',
  'Tony Kutch',
  'Terrance Bartell',
  'Alfredo Cole',
  'Willard Bauch',
  'Emilio Goodwin',
  'Trevor Bogan',
  'Jeremy Hermiston',
  'Gilbert Cummerata',
  'Tyrone Homenick',
  'Dwight Cummings',
  'Andy Homenick',
  'Lamar Hartmann',
  'Jeffery Romaguera',
  'Roland Bode',
  'Anthony Runolfsdottir',
  'Jesus Wisozk',
  'Kirk Schaefer',
  'Ralph Erdman',
  'Gerald Parisian',
  'Edwin McClure',
  'Clay Hickle',
  'Jody Christiansen',
  'Alberto Klocko',
  'Orlando Halvorson',
  'Enrique Kuhic',
  'Robin Kessler',
  'Jonathan Hintz',
  'Freddie Ankunding',
  'Marcus Kilback',
  'Louis Zemlak',
  'Alfonso Keeling',
  'Bryan Hauck',
  'Andres Pfeffer',
  "Stewart O'Kon",
  'Emmett Blick',
  'Sean Hahn',
  'Melvin Dach',
  'Nicolas Ferry',
  'Leslie Mayer',
  'Javier Dach',
  'Harvey Daugherty',
  "Tommy O'Connell",
  'Harold Satterfield',
  'Irving Grady',
  'Percy Kerluke',
  'Jean Beatty',
  'Gregg Stiedemann',
  'Jessie Howe',
  'Tommie Carter',
  'Elijah Stamm',
  'Billy Blick',
  'Orville Wilderman',
  'Matt Willms',
  'Jordan Conn',
  'Abel Stroman',
  'Rudy Fritsch',
  "Ramiro O'Kon",
  'Loren Jenkins',
  'Lee Herzog',
  'Francis Emard',
  'Jack Fadel',
  'Emanuel Sauer',
  'Craig Franecki',
  'Nicholas Schmeler',
  'Jan Cremin',
  'Gregory Huels',
  'Marion Abernathy',
  'Enrique Gleason',
  'Troy Hickle',
  'Adrian Breitenberg',
  'Clarence Gottlieb',
  'Donald Steuber',
  'Leonard Fay',
  'Darrell Lakin',
  'Lee Schinner',
  'Guy Crist',
  'Carlos Leannon',
  'Jesse Vandervort',
  'Russell Kuhic',
  'Ismael Abernathy',
  'Larry Weimann',
  'Mitchell Runolfsdottir',
  'Brent Hermann',
  'Clarence Hermiston',
  'Al Lakin',
  'Tommy Ratke',
  'Elmer Okuneva',
  'Andy Legros',
  'Tomas Crooks',
  'Armando Walker',
  'Mark Wilkinson',
  "Edmund O'Kon",
  'Johnnie McKenzie',
  'Jose Murray',
  'Laurence Kub',
  'Jesse Lynch',
  'Marshall Reichel',
  'Gregory Bernier',
  'Ismael Daugherty',
  'Jeremy Bogisich',
  'Jordan Wehner',
  'Andres Grady',
  'Jamie Nader',
  'Darrell Reichel',
  'Marco Stark',
  'Cary Gaylord',
  'Aaron Dach',
  'Lee Schultz',
  'Antonio Batz',
  'Van Powlowski',
  'Ricardo Stehr',
  'Blake Funk',
  'Luis Krajcik',
  'Anthony Swaniawski',
  'Marlon Grimes',
  'Gary Schowalter',
  'Kristopher Bergstrom',
  'Rodney Rolfson',
  'Jack Kub',
  'Mark Mueller',
  'Allan Batz',
  'Virgil Kirlin',
  'Dexter Hand',
  'Ervin Cole',
  'Loren Reilly',
  'Kelvin Casper',
  'Tyler Windler',
  'Kent Brekke',
  'Barry Stroman',
  'Wade Cormier',
  'Jerry Lynch',
  'Devin Boyer',
  'Hugo Torphy',
  'Cameron Johnston',
  'Leslie Gleichner',
  'Derrick Zulauf',
  'Randolph Schmidt',
  'Rex Dooley',
  'Albert Jacobs',
  'Taylor Bernier',
  'Johnathan Fahey',
  'Santos Bayer',
  'Marty Parisian',
  'Felipe Bins',
  'Guy Leuschke',
  'Arnold Macejkovic',
  'Saul Haag',
  'Lee Parisian',
  'Johnathan Sporer',
  'Owen Cremin',
  'Carlos Maggio',
  'Ronald Pfeffer',
  'Bill Lakin',
  'Raul Stark',
  'Winston Schmidt',
  'Harold Harvey',
  'Maurice King',
  'Al Dach',
  'Adam Wisoky',
  'Richard Mraz',
  'Alejandro Braun',
  'Jonathan Deckow',
  'Lance Homenick',
  'Darren Kulas',
  'Barry Runte',
  'Eddie Hodkiewicz',
  'Marvin Nolan',
  'Eugene Reichel',
  'Milton Gutmann',
  'Doyle Koch',
  'Angelo Mueller',
  'Edmund Shanahan',
  'Wendell Moen',
  'Lorenzo Moore',
  'Evan Bogan',
  'Julio Johnston',
  'Frank Daugherty',
  'Levi Jenkins',
  'Anthony Johnson',
  'Joseph Herman',
  'Randy Cronin',
  'Jimmy Bashirian',
  'Duane Lynch',
  'Philip Bogisich',
  'Dennis Breitenberg',
  'Ira Walter',
  'Stuart Mante',
  'Santiago Hermann',
  'Brad Jaskolski',
  'Andres Abernathy',
  'Arnold Muller',
  'Terence Howell',
  'Alfred Tromp',
  'Conrad Mosciski',
  'Brent Kuphal',
  'Robert Gerhold',
  'Dominick Ondricka',
  'Erick Bailey',
  'Emilio Hodkiewicz',
  'Clyde Spinka',
  'Johnathan Ankunding',
  'Jeffrey Friesen',
  'Phil Prosacco',
  'Andres Haley',
  'Sammy Feil',
  'Ed Carter',
  'Josh Anderson',
  'Allen Greenholt',
  'Kurt Dooley',
  'Todd Jakubowski',
  'Lee Ratke',
  'Martin Miller',
  'Wilbur Wehner',
  'Jerald Vandervort',
  'Forrest Fadel',
  'Lewis Corkery',
  'Alexander Nikolaus',
  'Steven Williamson',
  'Dominic Hickle',
  'Israel Connelly',
  'Tyrone Wintheiser',
  'Gilbert Bode',
  'Erick Sanford',
  'Earl Cronin',
  'Harold Mills',
];
const activities = [
  {
    type: 'joining',
    message: 'has just registered an account.',
  },
  {
    type: 'joining',
    message: 'has joined now.',
  },
  {
    type: 'joining',
    message: 'created a new account.',
  },
  {
    type: 'joining',
    message: 'joined to the community.',
  },
  {
    type: 'joining',
    message: 'registered an account.',
  },
  {
    type: 'package-purchase-silver',
    message: 'has purchased the ',
  },
  {
    type: 'package-purchase-gold',
    message: 'has purchased the ',
  },
  {
    type: 'package-purchase-gold',
    message: 'has just migrated to the ',
  },
  {
    type: 'package-purchase-diamond',
    message: 'has purchased the ',
  },
  {
    type: 'package-purchase-diamond',
    message: 'has just migrated to the ',
  },
  {
    type: 'joining',
    message:
      'has created a new account to purchase the <strong class="text-[#7F1BC4]">Gold</strong> package',
  },
  {
    type: 'joining',
    message:
      'has created a new account to purchase the <strong class="text-blue-500">Diamond</strong> package',
  },
  {
    type: 'joining',
    message:
      'has created a new account to purchase the <strong class="text-teal-600">Silver</strong> package',
  },
];

const seconds = [6, 10, 12, 15, 20, 30];

function shuffleArray(array) {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function pickRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// const getNewAlert = () => {
//   const sortedActivities = shuffleArray(activities);
//   const personName = pickRandomItem(persons);
//   const activity = pickRandomItem(sortedActivities);
//
//   return {
//     type: activity?.type,
//     message: `${personName} ${activity?.message}`,
//   };
// };

function animateSections() {
  const avatarSection = document.getElementById('avatarSection');
  const activitySection = document.getElementById('activitySection');

  avatarSection.style.display = 'block';
  activitySection.style.display = 'block';
  setTimeout(() => {
    avatarSection.style.opacity = '1';
    avatarSection.style.transform = 'translateY(0)';
    activitySection.style.opacity = '1';
    activitySection.style.transform = 'translateY(0)';
  }, 100);
}

function refreshSection() {
  /**
   * Documentation of the api: https://randomuser.me/
   */
  axios({
    method: 'get',
    url: 'https://randomuser.me/api/',
  }).then(res => {
    const results = res.data.results ?? [];
    const person = results.length > 0 ? results[0] : null;

    if (person) {
      const personFirstName = person?.name?.first;
      const personLastName = person?.name?.last;
      const personFullName =
        personFirstName && personLastName
          ? `${personFirstName} ${personLastName}`
          : pickRandomItem(persons);
      const personImage = person?.picture?.thumbnail;

      const sortedActivities = shuffleArray(activities);
      const activity = pickRandomItem(sortedActivities);

      const sectionContainer = document.querySelector('#sectionContainer');

      if (activity.type === 'joining') {
        sectionContainer.innerHTML = `
        <img id="avatarSection" src="${personImage}" alt="Avatar"
         class="rounded-full h-[40px] w-[40px] border-4 border-white shadow" style="display: none;">
    <div id="activitySection" style="display: none;" class="text-[13px]">
        <span class="text-purple-700 font-bold">${personFullName}</span>
        ${activity?.message}
    </div>
        `;
      } else {
        const packageName =
          activity?.type === 'package-purchase-silver'
            ? 'Silver'
            : activity?.type === 'package-purchase-gold'
            ? 'Gold'
            : activity?.type === 'package-purchase-diamond'
            ? 'Diamond'
            : '';
        const packageImage =
          activity?.type === 'package-purchase-silver'
            ? './ic_package_silver_trophy.png'
            : activity?.type === 'package-purchase-gold'
            ? './ic_package_gold_trophy.png'
            : activity?.type === 'package-purchase-diamond'
            ? './ic_package_diamond_trophy.png'
            : '';

        const packageColor =
          activity?.type === 'package-purchase-silver'
            ? 'bg-teal-600'
            : activity?.type === 'package-purchase-gold'
            ? 'bg-[#7F1BC4]'
            : activity?.type === 'package-purchase-diamond'
            ? 'bg-blue-500'
            : '';

        sectionContainer.innerHTML = `
        <img id="avatarSection" src="${personImage}" alt="Avatar"
         class="rounded-full h-[40px] w-[40px] border-4 border-white shadow" style="display: none;">
    <div id="activitySection" style="display: none;" class="text-[13px]">
        <span class="text-purple-700 font-bold">${personFullName}</span>
        ${activity?.message}
        <div class="inline-flex items-center text-white rounded-[10px] p-[5px] py-[3px] ${packageColor} text-[12px]">
            <img src="${packageImage}" class="w-[13px] inline" />
            <span class="ml-[5px]">${packageName}</span>
        </div>&nbsp; package.
    </div>
        `;
      }
      animateSections();
    }

    const randomSeconds = pickRandomItem(seconds);

    setTimeout(() => {
      refreshSection();
    }, randomSeconds * 1000);
  });
}

refreshSection();
