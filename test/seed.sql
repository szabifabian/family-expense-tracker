insert into user (username, password, email, unique_code, created_at, updated_at) values ('felhasználó 1', '684308a5dc8d04e1ffb268931e916f5c68f31ee5d83a21cdbbbcb7e5b14317c8a7511958c8411e9e42a60d6bdc630e083af839dfaf3ec0e08e5832b6487a1152', "felhasznalo1@gmail.com", "1", "2020-11-7", "2020-11-7");
insert into user (username, password, email, unique_code, created_at, updated_at) values ('felhasználó 2', '567b3cb9ba66f083a8ee79e07ec41af7a98a7ab89365ef46cc87cc272bd9bc26c7d38b329966337f390ade4b31fb1999f5b6ec784333fcfcea449489953b41ac', "felhasznalo2@gmail.com", "2", "2020-11-7", "2020-11-7");
insert into user (username, password, email, unique_code, created_at, updated_at) values ('felhasználó 3', '84874f05f2d1ba076ca502d8411ab0e8de87480a68fca87332d6234d7e87707fa4dfb7c4b39f30c324fd4a47b65127b8129926d7c20e194d3a629adb853c4dd7', "felhasznalo3@gmail.com", "3", "2020-11-7", "2020-11-7");

insert into family (family_name,created_at,updated_at) values ("Második család","2020-11-7", "2020-11-7");

insert into family_member (role,created_at,updated_at,user_id,family_id) values ("ADMIN","2020-11-7", "2020-11-7",2,1);
