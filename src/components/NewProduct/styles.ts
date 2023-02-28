import styled, { css } from "styled-components";

interface IProps {
  isDragActive: boolean;
  isDragReject: boolean;
}

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone",
})<IProps>`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  transition: height 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.isDragActive && dragActive}
  ${(props) => props.isDragReject && dragReject}
`;
