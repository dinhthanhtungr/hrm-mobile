import { Button } from "../shadcn/button";

type AppButtonProps = React.ComponentProps<typeof Button>;

export function AppButton(props: AppButtonProps) {
  return <Button {...props} />;
}
