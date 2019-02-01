import glamorous from "glamorous-native";

const style = ({ Metrics, Colors }) => ({
  flex: 1,
  paddingTop: Metrics.baseMargin,
  backgroundColor: Colors.transparent
});

const ViewContainer = glamorous.view(({ theme }) => style(theme));
ViewContainer.displayName = "containers.Container.ViewContainer";

const ScrollViewContainer = glamorous.scrollView(({ theme }) => style(theme));
ScrollViewContainer.displayName = "containers.Container.ScrollViewContainer";

export { ViewContainer, ScrollViewContainer };
