import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    <main className="fixed inset-0">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <SignIn
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

export default SignInPage;
