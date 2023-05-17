import { Header as MantineHeader, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background,
    padding: "0 20px",
  },
  logo: {
    color: theme.white,
  },
}));

export function Header() {
  const { classes } = useStyles();

  return (
    <MantineHeader className={classes.header} height={50}>
      <span className={classes.logo}>Онлайн-словарь</span>
    </MantineHeader>
  );
}
