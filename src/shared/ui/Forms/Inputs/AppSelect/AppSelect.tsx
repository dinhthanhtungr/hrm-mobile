import { 
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";

import styles from "./AppSelect.module.css";

type SelectOption = {
    id: string;
    label: string;
}

type AppSelectProps = {
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    value?: string;
    onChange: (value: string) => void;
    isDisabled?: boolean;
    isInvalid?: boolean;
}


export function AppSelect({
  label,
  placeholder = "Chon...",
  options,
  value,
  onChange,
  isDisabled,
  isInvalid,
}: AppSelectProps) {
  return (
    <Select
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

      <Button className={styles.trigger}>
        <SelectValue className={styles.value}>
          {({ defaultChildren, isPlaceholder }) =>
            isPlaceholder ? placeholder : defaultChildren
          }
        </SelectValue>
        <span className={styles.icon}>v</span>
      </Button>

      <Popover className={styles.popover}>
        <ListBox className={styles.listBox}>
          {options.map((option) => (
            <ListBoxItem
              key={option.id}
              id={option.id}
              className={styles.option}
            >
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}
