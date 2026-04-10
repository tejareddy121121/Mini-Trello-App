import { useNavigate, Link } from "react-router-dom";
function SignInPage() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    localStorage.setItem("loggedInUser", email);

    navigate("/dashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <form className="px-4 py-3" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mb-2">
            <i className="fa-solid fa-bars-progress fs-5 border border-1 p-3 rounded-4 shadow-sm bg-danger text-white"></i>
          </div>
          <div className="text-center">
            <div className="fs-4 fw-bold">Welcome back</div>
            <small className="text-muted">
              Sign in to your TaskFlow account
            </small>
          </div>
          <div className="mb-3 pt-4">
            <label
              htmlFor="exampleDropdownFormEmail1"
              className="form-label text-start d-block"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleDropdownFormPassword1"
              className="form-label text-start d-block"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="******"
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="btn btn-danger form-control">
            Sign in
          </button>
          <div className="d-flex flex-row gap-2 justify-content-center">
            Don't have an account?
            <Link to="/SignUpPage" className="text-dark fw-medium">
              Sign up
            </Link>
          </div>
        </form>
        <div className="dropdown-divider"></div>
      </div>
    </div>
  );
}
export default SignInPage;
