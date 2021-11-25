import React from "react";
import { Select } from "antd";
import { Raw } from "../types";

type SelectProps = React.ComponentProps<typeof Select>;

interface IDSelectProps
  extends Omit<SelectProps, "options" | "value" | "onChange"> {
  value?: Raw | null | undefined;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[]; // 选项
}

/**
 * value可以穿入多种类型的值
 * onChange只会回调number或者undefined类型
 * 当isNaN(Number(value))为true时，代表选择默认类型
 * 当选择默认类型时, onChange回调undefined
 * @param props
 */
const IDSelect = (props: IDSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      {...restProps}
      value={options?.length ? toNum(value) : 0}
      onChange={(value) => onChange?.(toNum(value) || undefined)}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options &&
        options.length !== 0 &&
        options.map((option) => (
          <Select.Option key={option.id} value={option.id}>
            {option.name}
          </Select.Option>
        ))}
    </Select>
  );
};

const toNum = (val: unknown) => {
  return isNaN(Number(val)) ? 0 : Number(val);
};

export default IDSelect;
