import {
  build,
  reactStyle,
  mixClass,
  Item,
  Image,
  Card,
  Content,
  Header,
  Meta,
  Description,
  SemanticUI,
} from "react-atomic-molecule";

const CardView = (props) => {
  const {
    headerProps,
    metaProps,
    dimmer,
    imageProps,
    imageSrc,
    imageWrapperAttr,
    href,
    item,
    lineAtom,
    ...letProps
  } = props;

  let {
    image,
    content,
    header,
    meta,
    description,
    imageWrapper,
    imageContainer,
    ...others
  } = letProps;

  if (header) {
    header = <Header {...headerProps}>{header}</Header>;
  }
  if (meta) {
    meta = <Meta {...metaProps}>{meta}</Meta>;
  }
  if (description) {
    description = <Description lineAtom={lineAtom}>{description}</Description>;
  }

  /*Cook Image*/
  if (imageSrc) {
    if (!imageWrapper) {
      let imgWrapperAtom;
      if (href) {
        imgWrapperAtom = "a";
      }
      imageWrapper = <SemanticUI atom={imgWrapperAtom} />;
    }
    if (!imageContainer) {
      imageContainer = <Image />;
    }
    image = build(imageWrapper)(
      {
        className: "image-wrapper",
        href: href,
        style: Styles.imgWrapper,
        ...imageWrapperAttr,
      },
      buuild(imageContainer)({
        styles: reactStyle(Styles.image, null, false),
        src: imageSrc,
        className: "rounded",
        ...imageProps,
      })
    );
    // fixed can't use padding with % in firefox and edge
    // http://stackoverflow.com/questions/23717953/padding-bottom-top-in-flexbox-layout
    image = <SemanticUI>{image}</SemanticUI>;
  }

  /*Cook View Type*/
  let View;
  if (item) {
    View = Item;
  } else {
    View = Card;
  }

  if (header || meta || description) {
    content = (
      <Content>
        {header}
        {meta}
        {description}
      </Content>
    );
  }

  return (
    <View {...others}>
      {image}
      {content}
      {dimmer}
    </View>
  );
};

export default CardView;

const Styles = {
  image: {
    maxWidth: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: ["translate(-50%, -50%)"],
  },
  imgWrapper: {
    position: "relative",
    paddingBottom: "100%",
    overflow: "hidden",
    display: "block",
  },
};
