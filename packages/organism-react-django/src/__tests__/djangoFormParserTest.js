import { expect } from "chai";

import djangoFormParser from "../djangoFormParser";

describe("Test djangoFormParser", () => {
  it("Simple Test", () => {
    const form = `<li><label for="id_username">Username:</label> <input type="text" name="username" maxlength="150" autofocus required id="id_username"> <span class="helptext">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</span></li>
      <li><label for="id_password1">Password:</label> <input type="password" name="password1" required id="id_password1"> <span class="helptext"><ul><li>Your password can&#39;t be too similar to your other personal information.</li><li>Your password must contain at least 8 characters.</li><li>Your password can&#39;t be a commonly used password.</li><li>Your password can&#39;t be entirely numeric.</li></ul></span></li>
      <li><label for="id_password2">Password confirmation:</label> <input type="password" name="password2" required id="id_password2"> <span class="helptext">Enter the same password as before, for verification.</span></li>`;
    const data = djangoFormParser({ form });
    expect(data.form).to.have.any.keys("fields");
  });
});
