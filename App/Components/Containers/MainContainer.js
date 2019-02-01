import glamorous from "glamorous-native";

const MainContainer = glamorous.view(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.Colors.transparent
}));

MainContainer.displayName = "containers.MainContainer";

export default MainContainer;
