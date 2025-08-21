import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ title, subtitle, onMenuClick, actions }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden mr-2"
              onClick={onMenuClick}
              icon="Menu"
            />
            <div>
              <h1 className="text-xl font-bold font-display text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          
<div className="flex items-center space-x-3">
            {actions}
            <div className="flex items-center space-x-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Campaign Manager</p>
                <p className="text-xs text-gray-500">Active Campaign</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon="LogOut"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.ApperSDK) {
                    const { ApperUI } = window.ApperSDK;
                    ApperUI.logout();
                  }
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;