import  { data, User, Pet} from './data.js'

data.insertUser(new User('user-' + data.usersCount, 'Jack Skellington', 'jack@haloween.com', 'jack', '123123123', null,'regular'))
data.insertUser(new User('user-' + data.usersCount, 'Shally', 'shally@haloween.com', 'shally', '123123123', null, 'regular'))
data.insertUser(new User('user-' + data.usersCount, 'Sandy Claws', 'sandy@christmas.com', 'claws', '123123123', null,'regular'))
data.insertUser(new User('user-' + data.usersCount, 'Oogie Boogie', 'oogie@boogie.com', 'oogieboogie', '123123123', null, 'regular'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-0', 'Zero', '2024-12-01', 0, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXcxNWd0enZhZjBxMzB0NGhyNnFqN3ZhdHVyMXd3aWpmaXdicGlveCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Bo95o8mSV8jHW/giphy.gif'))
data.insertPet(new Pet('pet-' + data.petsCount, 'user-0', 'Scraps', '2020-12-01', 1, 'https://imgs.search.brave.com/1VVPWkEK7nOD4Y0qAHwieXRR7edFknS3eBPyxpBdebk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iLnRo/dW1icy5yZWRkaXRt/ZWRpYS5jb20vVkI4/dThyNkdpdUt6V2NM/aWZuQmcwSHk4RDA1/SE9CWlRNSHpCajFr/ekZ6VS5qcGc'))
data.insertPet(new Pet('pet-' + data.petsCount, 'user-0', 'Sparky', '2014-12-01', 8, 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dzV0ZTkzN3ZyN2g2NTUzMWVhNWEzMXRndmo5ZGpiMHZlMzV1YThheiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VEdrOxVXfkgRW/giphy.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-1', 'Mafia', '2025-07-01', 1.5, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnI3Z3J0c3lybjFwcmVpMjVoN29nNXQzNml2ZTNjbXZ3NHdncTQ5MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/901mxGLGQN2PyCQpoc/giphy.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-2', 'Dormilon', '2019-11-01', 4, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnI3Z3J0c3lybjFwcmVpMjVoN29nNXQzNml2ZTNjbXZ3NHdncTQ5MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/v6aOjy0Qo1fIA/giphy.gif'))
data.insertPet(new Pet('pet-' + data.petsCount, 'user-2', 'Espumita', '2024-10-01', 1.4, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGdmajV3cHltazV2Z2ttZGs0bXp3YjZ0dTRmamUwNWNuYTM2a2UyeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cYZkY9HeKgofpQnOUl/giphy.gif'))

data.insertPet(new Pet('pet-' + data.petsCount, 'user-3', 'Osito', '2023-09-01', 3.5, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHQ3b2NjNDE3aW1rZGUwYTJsaXI4dzV6aGI5cGk0NmE4aGJ2cmhoMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lNLqexL939DTyR0uH2/giphy.gif'))
data.insertPet(new Pet('pet-' + data.petsCount, 'user-3', 'Negrita', '2022-06-01', 3.2, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHQ3b2NjNDE3aW1rZGUwYTJsaXI4dzV6aGI5cGk0NmE4aGJ2cmhoMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Q60eJgzLbQUM6qFRQo/giphy.gif'))
data.insertPet(new Pet('pet-' + data.petsCount, 'user-3', 'Sargento', '2022-09-01', .2, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzVpOXp6ZGRlNXdwdHh3Z28xODRzN3djMTl2ZTF2MHY1NGl4dW13NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3imh62nmqnKYutIGnJ/giphy.gif'))
data.insertPet(new Pet('pet-' + data.petsCount, 'user-3', 'Egoista', '2023-09-01', .25, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzVpOXp6ZGRlNXdwdHh3Z28xODRzN3djMTl2ZTF2MHY1NGl4dW13NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/D74yIoiOstPA1e3xYL/giphy.gif'))
