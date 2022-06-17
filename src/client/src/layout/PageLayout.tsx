import { StyleSheet, css } from "aphrodite/no-important";

type PageLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <div className={css(styles.layout)}>
      <h2 className={css(styles.title)}>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

const styles = StyleSheet.create({
  layout: {
    maxWidth: 900,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 32,
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    marginBottom: 24,
  },
});
