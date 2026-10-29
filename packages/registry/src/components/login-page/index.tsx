import { AuthLayout } from "../auth-layout/index";
import { LoginForm } from "../login-form/index";
import { SocialLoginButtons } from "../social-login-buttons/index";

function LoginPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <AuthLayout
      className={className}
      title="Veil UI"
      description="The calm component registry."
      highlights={[
        "Accessible primitives out of the box",
        "Copy the source into your project",
        "Themes driven by design tokens",
      ]}
      footer="Protected by enterprise-grade security."
      {...props}
    >
      <div className="grid gap-5">
        <LoginForm />
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" aria-hidden />
          or continue with
          <span className="h-px flex-1 bg-border" aria-hidden />
        </div>
        <SocialLoginButtons />
      </div>
    </AuthLayout>
  );
}

export { LoginPage };
