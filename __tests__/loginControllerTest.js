const jwt = require("jsonwebtoken");
const { loginController } = require("../controllers/usersControllers");
const { User } = require("../models/userModel");

describe("login controller test", () => {
  it("it should return status 200", async () => {
    const user = {
      _id: "1",
      email: "test1",
      subscription: "starter",
    };
    const mReq = {
      body: {
        email: "test1@mail.com",
        password: "test1",
      },
    };
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    const mRes = {
      status: jest.fn(() => mRes),
      json: jest.fn(() => mRes),
    };
    const result = {
      user: {
        email: mReq.body.email,
        subscription: user.subscription,
      },
      token,
    };
    jest.spyOn(User, "findOne").mockImplementationOnce(() => mReq.body.email);

    User.findByIdAndUpdate = jest.fn();

    await loginController(mReq, mRes);

    expect(mRes.status).toEqual(200);
    expect(mRes.json).toHaveBeenCalledWith(result);
  });
});

//====================================================

// const add = (a, b) => {
//     return a + b;
// }

  // describe('add test', () => {
  //   it('add two numbers', () => {
  //     const first = 1;
  //     const second = 1;
  //     const addResult = add(first, second);
  //     expect(addResult).toEqual(first + second);
  //   });
  // });
