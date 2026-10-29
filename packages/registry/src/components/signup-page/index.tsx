import { AuthLayout } from "../auth-layout/index";
import { SignupForm } from "../signup-form/index";
import { SocialLoginButtons } from "../social-login-buttons/index";

function SignupPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <AuthLayout
      className={className}
      title="Veil UI"
      description="Start free. No credit card required."
      highlights={[
        "Free for personal projects",
        "Unlimited components",
        "Community support",
      ]}
      footer="By signing up you agree to our terms."
      {...props}
    >
      <div className="grid gap-5">
        <SignupForm />
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" aria-hidden />
          or sign up with
          <span className="h-px flex-1 bg-border" aria-hidden />
        </div>
        <SocialLoginButtons providers={["github", "google"]} />
      </div>
    </AuthLayout>
  );
}

export { SignupPage };
