import { Text, createStyles } from "@mantine/core";
import { Fragment, forwardRef, useMemo } from "react";
import { useStore } from "store";

const useStyles = createStyles((theme) => ({
  fragments: {
    display: "flex",
  },
}));

interface DropdownItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(({ image, label, description, ...props }, ref) => {
  const inputValue = useStore((state) => state.inputValue);
  const fragments = useMemo(() => {
    if (inputValue === "") return [label];

    const splitten = label.split(new RegExp(inputValue, "i"));

    return splitten.reduce((fragments, fragment, index) => {
      fragments.push(<Text>{fragment}</Text>);

      if (index !== splitten.length - 1)
        fragments.push(
          <Text>
            <mark>{inputValue}</mark>
          </Text>
        );

      return fragments;
    }, [] as JSX.Element[]);
  }, [label, inputValue]);
  const { classes } = useStyles();

  return (
    <div ref={ref} {...props}>
      <div className={classes.fragments}>
        {fragments.map((fragment, index) => (
          <Fragment key={index}>{fragment}</Fragment>
        ))}
      </div>
      <Text size="xs" opacity={0.65}>
        {description}
      </Text>
    </div>
  );
});
