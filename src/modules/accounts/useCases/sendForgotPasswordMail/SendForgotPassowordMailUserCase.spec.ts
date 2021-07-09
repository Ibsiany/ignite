import { DayjsDateProvider } from "shared/container/providers/DateProvider/implementatios/DayjsDateProvider";
import { MailProviderInMemory } from "shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { UsersRepositoryInMemory } from "../../../../modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../../../modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./sendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory, 
      dateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProviderInMemory, "sendMail")

      await usersRepositoryInMemory.create({
          driver_license: "664875",
          email: "user@email.com",
          name: "Qualquer",
          password: "1234"
      })

      await sendForgotPasswordMailUseCase.execute("user@email.com")

      expect(sendMail).toHaveBeenCalled()
  });

  it("should not be able to send email if user does not exists", async () => {
      await expect(
          sendForgotPasswordMailUseCase.execute("qualquer@email.com")
      ).rejects.toEqual(new AppError("User does not exists!"))
  })

  it("should be able to create an users token", async () => {
      const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
      usersRepositoryInMemory.create({
        driver_license: "123456",
        email: "user1@email.com",
        name: "Qualquer 1",
        password: "1234"
    })

    await sendForgotPasswordMailUseCase.execute("user1@email.com");

    expect(generateTokenMail).toBeCalled()
  })
});
