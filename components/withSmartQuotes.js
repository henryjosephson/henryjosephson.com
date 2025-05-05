import React from 'react';
import { smartQuotes } from '../lib/utils';

/**
 * A higher-order component that processes text content to use smart quotes
 * This will render all text nodes with smart quotes
 */
export default function withSmartQuotes(Component) {
  return function SmartQuotesWrapper(props) {
    // Function to process React children recursively
    const processChildren = (children) => {
      return React.Children.map(children, child => {
        // If the child is a string, apply smart quotes
        if (typeof child === 'string') {
          return smartQuotes(child);
        }
        
        // If the child is a React element, process its children
        if (React.isValidElement(child) && child.props.children) {
          // Skip processing children of code elements and components with dangerouslySetInnerHTML
          if (
            child.type === 'code' || 
            child.type === 'pre' || 
            (child.props.dangerouslySetInnerHTML && child.props.dangerouslySetInnerHTML.__html)
          ) {
            return child;
          }
          
          // Process children recursively
          const newChildren = processChildren(child.props.children);
          return React.cloneElement(child, { ...child.props, children: newChildren });
        }
        
        // Return unchanged for everything else
        return child;
      });
    };
    
    // Process the component's children
    const newChildren = processChildren(props.children);
    
    // Return the component with processed children
    return <Component {...props}>{newChildren}</Component>;
  };
}