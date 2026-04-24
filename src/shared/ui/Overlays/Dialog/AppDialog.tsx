import { Dialog } from "../shadcn/dialog";

type AppDialogProps = React.ComponentProps<typeof Dialog>;

export function AppDialog(props: AppDialogProps) {
  return <Dialog {...props} />;
}
