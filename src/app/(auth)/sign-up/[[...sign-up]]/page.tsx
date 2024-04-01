import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <main className="fixed inset-0">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <SignUp
          appearance={{
            elements: {
              socialButtonsBlockButton__facebook: {
                "&:hover": {
                  background: "#161925",
                },
              },
              socialButtonsBlockButton__google: {
                "&:hover": {
                  background: "#161925",
                },
              },
            },
          }}
        />
      </div>
    </main>
  );
}

export default SignUpPage;
