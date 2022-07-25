// const getUser = (id) => {
//   const nama = id === 1 ? "Rifki" : "Romadhan";
//   return {
//     id,
//     nama,
//   };
// };

// const userSatu = getUser(1);
// console.log(userSatu);

// const userDua = getUser(2);
// console.log(userDua);

// console.log("Hello World");

const getUser = (id, cb) => {
  const times = id === 1 ? 3000 : 2000;
  setTimeout(() => {
    const nama = id === 1 ? "Rifki" : "Romadhan";
    cb({ id, nama });
  }, times);
};

const userSatu = getUser(1, (user) => {
  console.log(user);
});

const userDua = getUser(2, (user) => {
  console.log(user);
});

console.log("Hello World");
