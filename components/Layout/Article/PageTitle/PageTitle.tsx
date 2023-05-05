import {
  PageTitleWrapper,
  StyledBanner,
  StyledTitle,
  StyledA,
  StyledSpan,
  StyledAlert,
} from "./PageTitle.style";
import { ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";
import { StyledLink } from "./PageTitle.style";

interface Props {
  recordMap: ExtendedRecordMap;
}

export default function PageTitle(props: Props) {
  const { recordMap } = props;

  return (
    <PageTitleWrapper>
      <StyledTitle>{getPageTitle(recordMap)}</StyledTitle>
    </PageTitleWrapper>
  );
}
