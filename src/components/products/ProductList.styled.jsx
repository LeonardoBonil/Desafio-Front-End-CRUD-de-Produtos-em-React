
import styled from 'styled-components';
import { Box, Fab } from '@mui/material';

//  CONTAINER PRINCIPAL RESPONSIVO
export const ResponsiveContainer = styled(Box)`
  padding: 24px;
  min-height: 100vh;
  background: #f8f9fa;

  /*  BREAKPOINTS RESPONSIVOS */
  @media (max-width: 968px) {
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

// HEADER RESPONSIVO
export const ResponsiveHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 968px) {
    margin-bottom: 24px;
    padding: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
    margin-bottom: 20px;
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    margin-bottom: 16px;
  }
`;

// TÍTULO RESPONSIVO
export const ResponsiveTitle = styled.h1`
  margin: 0;
  color: #333;
  font-size: 2rem;
  font-weight: 700;

  @media (max-width: 968px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

// STATS RESPONSIVAS
export const StatsContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  /* Mobile */
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  /* Mobile pequeno */
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 12px 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #1976d2;

  .stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1976d2;
    margin: 0;
    
    @media (max-width: 480px) {
      font-size: 1.3rem;
    }
  }

  .stat-label {
    font-size: 0.8rem;
    color: #666;
    margin: 4px 0 0 0;
    
    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }

  /* Mobile pequeno */
  @media (max-width: 480px) {
    padding: 8px 12px;
  }
`;

//  GRID RESPONSIVO
export const ResponsiveGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  /* ADAPTAÇÃO POR DISPOSITIVO */
  @media (max-width: 968px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

//  FAB RESPONSIVO
export const ResponsiveFab = styled(Fab)`
  &.MuiFab-root {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1000;

    @media (max-width: 768px) {
      bottom: 20px;
      right: 20px;
    }

    @media (max-width: 480px) {
      bottom: 16px;
      right: 16px;
      width: 48px;
      height: 48px;
      
      .MuiSvgIcon-root {
        font-size: 1.2rem;
      }
    }
  }
`;

//  LOADING RESPONSIVO
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 32px 16px;
  }

  @media (max-width: 480px) {
    padding: 24px 12px;
  }
`;

//  EMPTY STATE RESPONSIVO
export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .empty-icon {
    font-size: 4rem;
    color: #ccc;
    margin-bottom: 16px;
    
    @media (max-width: 480px) {
      font-size: 3rem;
    }
  }

  .empty-title {
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 8px;
    
    @media (max-width: 480px) {
      font-size: 1.3rem;
    }
  }

  .empty-subtitle {
    color: #999;
    margin-bottom: 24px;
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    padding: 32px 16px;
  }

  @media (max-width: 480px) {
    padding: 24px 12px;
  }
`;

//  SKELETON LOADING (BONUS!)
export const SkeletonCard = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  
  .skeleton-image {
    height: 200px;
    background: linear-gradient(90deg, #f5f5f5 25%, #e0e0e0 50%, #f5f5f5 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    
    @media (max-width: 768px) {
      height: 180px;
    }
    
    @media (max-width: 480px) {
      height: 160px;
    }
  }
  
  .skeleton-content {
    padding: 16px;
    
    @media (max-width: 480px) {
      padding: 12px;
    }
  }
  
  .skeleton-line {
    height: 16px;
    background: linear-gradient(90deg, #f5f5f5 25%, #e0e0e0 50%, #f5f5f5 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 8px;
    
    &.short {
      width: 60%;
    }
    
    &.medium {
      width: 80%;
    }
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

//  SEARCH BAR RESPONSIVO (BONUS!)
export const SearchContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

//  MOBILE ACTIONS CONTAINER
export const MobileActionsContainer = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 12px 16px;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

//  RESPONSIVE STATS GRID
export const ResponsiveStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`;