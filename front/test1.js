// 1) you can't "export default" an arrow function directy.
// You must declare the arrow "const one = () => 1" then "export default one" if wanted

// you can export default a function, and ommit it's name if wanted (eslint doesn't like)
//  => it will be exported with the name of the file
// best pratice is to name the function

// doing "export default function one() { return 1}" is best pratice
// but doing below, you can use the file name as function name when import
export default function one() {
  return 1;
}

export const two = () => 2;

export const three = 3;
