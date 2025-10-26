import { Bell, X, TrendingUp, DollarSign, CheckCircle } from 'lucide-react';
import type { JobAlert } from '../types';

interface AlertsPanelProps {
  alerts: JobAlert[];
  onMarkAsRead: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
}

export function AlertsPanel({ alerts, onMarkAsRead, onDismiss }: AlertsPanelProps) {
  const unreadAlerts = alerts.filter(alert => !alert.is_read);

  if (unreadAlerts.length === 0) {
    return null;
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'new_match':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'price_drop':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'application_update':
        return <CheckCircle className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'new_match':
        return 'bg-blue-50 border-blue-200';
      case 'price_drop':
        return 'bg-green-50 border-green-200';
      case 'application_update':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">
          Alerts
          {unreadAlerts.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">
              {unreadAlerts.length}
            </span>
          )}
        </h2>
      </div>

      <div className="space-y-3">
        {unreadAlerts.slice(0, 5).map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start gap-3 p-4 border rounded-lg ${getAlertStyle(alert.alert_type)}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getAlertIcon(alert.alert_type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{alert.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(alert.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => onMarkAsRead(alert.id)}
                className="p-1 hover:bg-white rounded transition-colors"
                title="Mark as read"
              >
                <CheckCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
              <button
                onClick={() => onDismiss(alert.id)}
                className="p-1 hover:bg-white rounded transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
