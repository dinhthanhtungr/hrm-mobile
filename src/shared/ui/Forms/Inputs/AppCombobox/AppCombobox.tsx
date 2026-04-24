import {
  Button,
  ComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover
} from "react-aria-components";


import styles from "./AppCombobox.module.css";

type ComboboxOption = {
  id: string;
  label: string;
};

type AppComboboxProps = {
  label?: string;
  placeholder?: string;
  options: ComboboxOption[];
  value?: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
};

export function AppCombobox({
  label,
  placeholder = "Tim va chon...",
  options,
  value,
  onChange,
  isDisabled,
  isInvalid,
}: AppComboboxProps) {
  return (
    <ComboBox
      items={options}
      selectedKey={value}
      onSelectionChange={(key) => {
        if (typeof key === "string") {
          onChange(key);
        }
      }}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      className={styles.wrapper}
    >
      {label ? <Label className={styles.label}>{label}</Label> : null}

      <div className={styles.inputShell}>
        <Input className={styles.input} placeholder={placeholder} />
        <Button className={styles.iconButton}>v</Button>
      </div>

      <Popover className={styles.popover}>
        <ListBox className={styles.listBox}>
          {(item: ComboboxOption) => (
            <ListBoxItem id={item.id} className={styles.option}>
              {item.label}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  );
}
