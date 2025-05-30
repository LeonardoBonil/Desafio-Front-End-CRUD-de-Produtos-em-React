
import styled from 'styled-components';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';

//  CARD PRINCIPAL RESPONSIVO
export const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  /*  RESPONSIVIDADE */
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    &:hover {
      transform: none; /* Desabilita hover em mobile */
    }
  }
`;

//  IMAGEM RESPONSIVA
export const StyledCardMedia = styled(CardMedia)`
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;

  @media (max-width: 768px) {
    height: 180px;
  }

  @media (max-width: 480px) {
    height: 160px;
  }
`;

//  BADGE DE ESTOQUE
export const StockBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${props => props.inStock ? '#4caf50' : '#f44336'};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 1;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 3px 6px;
  }
`;

//  CONTEÚDO FLEXÍVEL
export const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 16px !important;

  @media (max-width: 480px) {
    padding: 12px !important;
  }
`;

//  TÍTULO RESPONSIVO
export const ProductTitle = styled(Typography)`
  font-weight: 600 !important;
  margin-bottom: 8px !important;
  line-height: 1.3 !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 1rem !important;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem !important;
    -webkit-line-clamp: 1;
  }
`;

//  DESCRIÇÃO RESPONSIVA
export const ProductDescription = styled(Typography)`
  color: #666 !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px !important;
  flex-grow: 1;

  @media (max-width: 480px) {
    font-size: 0.8rem !important;
    -webkit-line-clamp: 1;
    margin-bottom: 8px !important;
  }
`;

//  CONTAINER DE INFO
export const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

//  PREÇO DESTACADO
export const ProductPrice = styled(Typography)`
  font-weight: 700 !important;
  color: #1976d2 !important;
  font-size: 1.1rem !important;

  @media (max-width: 480px) {
    font-size: 1rem !important;
  }
`;

//  CATEGORIA BADGE
export const CategoryBadge = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 2px 6px;
  }
`;

//  AÇÕES RESPONSIVAS
export const StyledCardActions = styled(CardActions)`
  padding: 8px 16px !important;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 480px) {
    padding: 8px 12px !important;
    flex-direction: column;
    gap: 8px;
  }
`;

//  BOTÕES DE AÇÃO
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

//  BOTÃO RESPONSIVO
export const ResponsiveIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    @media (max-width: 480px) {
      padding: 6px;
      
      .MuiSvgIcon-root {
        font-size: 1.1rem;
      }
    }
  }
`;