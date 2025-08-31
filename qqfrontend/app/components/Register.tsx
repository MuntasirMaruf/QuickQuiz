

export default function Register(){
    return(
<> 

<h1> Register </h1>
<br />
<br />
 <form>
    <div className="py-4 shadow">
        <div>
          <label>Full Name : </label>
          <input name="fullName" />
        </div>
        <br />
        <div>
          <label>Username : </label>
          <input name="username" />
        </div>
        <br />
          <div>
          <label>Email : </label>
          <input name="email" type="email" />
        </div>
        <br />
        <div>
          <label>Password : </label>
          <input name="password" type="password" />
        </div>
        <br />
        <div>
          <label>Confirm Password : </label>
          <input type="password" />
        </div>
        </div>
        <br />
        <button type="submit">Register</button>
      </form>
        

   </>
 );
}