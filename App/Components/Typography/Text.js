import glamorous from "glamorous-native";

const Text = glamorous.text(
  ({ theme }) => ({
    ...theme.Fonts.style.normal,
    color: theme.Colors.snow
  }),
  props =>
    props.h1 && {
      ...props.theme.Fonts.style.h1
    },
  props =>
    props.h2 && {
      ...props.theme.Fonts.style.h2
    },
  props =>
    props.h3 && {
      ...props.theme.Fonts.style.h3
    },
  props =>
    props.h4 && {
      ...props.theme.Fonts.style.h4
    },
  props =>
    props.h5 && {
      ...props.theme.Fonts.style.h5
    },
  props =>
    props.h6 && {
      ...props.theme.Fonts.style.h6
    },
  props =>
    props.small && {
      fontSize: props.theme.Fonts.size.small
    },
  props =>
    props.tiny && {
      fontSize: props.theme.Fonts.size.tiny
    },
  props =>
    props.description && {
      ...props.theme.Fonts.style.description
    },
  props =>
    props.center && {
      textAlign: "center"
    },
  props =>
    props.bold && {
      fontFamily: props.theme.Fonts.type.bold
    },
  props =>
    props.vCenter && {
      textAlignVertical: "center"
    },
  props =>
    props.color && {
      color: props.color
    }
);
Text.displayName = "typography.text";

export default Text;
